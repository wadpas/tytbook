const Order = require('../models/Order')
const Book = require('../models/Book')
const { StatusCodes } = require('http-status-codes')
const { attachCookiesToResponse, checkPermissions } = require('../utils')
const CustomError = require('../errors')

const fakeStripeAPI = async ({ subtotal, total }) => {
	const clientSecret = 'someRandomValue'
	return { clientSecret, total }
}

const createOrder = async (req, res) => {
	const { items: cartItems, tax, shippingFee } = req.body

	if (!cartItems || cartItems.length < 1) {
		throw new CustomError.BadRequestError('No cart items provided')
	}
	if (!tax || !shippingFee) {
		throw new CustomError.BadRequestError('Please provide tax and shipping fee')
	}
	let orderItems = []
	let subtotal = 0
	for (const item of cartItems) {
		const dbBook = await Book.findOne({ _id: item.book })
		if (!dbBook) {
			throw new CustomError.NotFoundError(`No book with id : ${item.book}`)
		}
		const { name, price, image, _id } = dbBook
		const singleOrderItem = {
			amount: item.amount,
			name,
			price,
			image,
			book: _id,
		}
		orderItems = [...orderItems, singleOrderItem]
		subtotal += item.amount * price
	}
	const total = tax + shippingFee + subtotal
	const paymentIntent = fakeStripeAPI({ subtotal, total })

	const order = await Order.create({
		clientSecret: paymentIntent.clientSecret,
		cartItem: orderItems,
		tax,
		shippingFee,
		subtotal,
		total,
		user: req.user.userId,
	})

	res.status(StatusCodes.CREATED).json({ order })
}

const getAllOrders = async (req, res) => {
	const orders = await Order.find({})
	res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getSingleOrder = async (req, res) => {
	const { id: orderId } = req.params
	const order = await Order.findOne({ _id: orderId })
	if (!order) {
		throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
	}
	checkPermissions(req.user, order.user)
	res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
	const orders = await Order.find({ user: req.user.userId })
	res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const updateOrder = async (req, res) => {
	const { id: orderId } = req.params
	const order = await Order.findOne({ _id: orderId })
	if (!order) {
		throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
	}
	checkPermissions(req.user, order.user)
	order.status = 'paid'
	await order.save()
	res.status(StatusCodes.OK).json({ order })
}

module.exports = {
	createOrder,
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	updateOrder,
}
