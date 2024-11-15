const { StatusCodes } = require('http-status-codes')
const Book = require('../models/Book')
const CustomError = require('../errors')
const path = require('path')

const getBooks = async (req, res) => {
	const books = await Book.find({})
	res.status(StatusCodes.OK).send({ books, count: books.length })
}

const getBook = async (req, res) => {
	const { id: bookId } = req.params
	const book = await Book.findOne({ _id: bookId }).populate('reviews')
	if (!book) {
		throw new CustomError.NotFoundError(`No book with id : ${bookId}`)
	}
	res.status(StatusCodes.OK).send({ book })
}

const createBook = async (req, res) => {
	req.body.user = req.user.userId
	const book = await Book.create(req.body)
	res.status(StatusCodes.CREATED).send({ book })
}

const updateBook = async (req, res) => {
	const { id: bookId } = req.params
	const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
		new: true,
		runValidators: true,
	})
	if (!book) {
		throw new CustomError.NotFoundError(`No book with id : ${bookId}`)
	}
	res.status(StatusCodes.OK).send({ book })
}

const deleteBook = async (req, res) => {
	const { id: bookId } = req.params
	const book = await Book.findOne({ _id: bookId })
	if (!book) {
		throw new CustomError.NotFoundError(`No book with id : ${bookId}`)
	}
	await book.remove()
	res.status(StatusCodes.OK).send({ msg: 'Success! Book removed.' })
}

const uploadImage = async (req, res) => {
	if (!req.files) {
		throw new CustomError.BadRequestError('No File Uploaded')
	}
	let bookImage = req.files.image
	if (!bookImage.mimetype.startsWith('image')) {
		throw new CustomError.BadRequestError('Please Upload Image')
	}
	const maxSize = 1024 * 1024
	if (bookImage.size > maxSize) {
		throw new CustomError.BadRequestError('Please upload image smaller 1MB')
	}
	const imagePath = path.join(__dirname, '../public/uploads/' + `${bookImage.name}`)
	await bookImage.mv(imagePath)
	res.status(StatusCodes.OK).send({ image: `/uploads/${bookImage.name}` })
}

module.exports = {
	createBook,
	getBooks,
	getBook,
	updateBook,
	deleteBook,
	uploadImage,
}
