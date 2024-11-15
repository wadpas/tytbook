const { StatusCodes } = require('http-status-codes')
const { checkPermissions } = require('../utils')
const Review = require('../models/Review')
const Book = require('../models/Book')
const CustomError = require('../errors')

const createReview = async (req, res) => {
	const { book: bookId } = req.body
	const book = await Book.findOne({ _id: bookId })
	if (!book) {
		throw new CustomError.NotFoundError(`No book with id : ${bookId}`)
	}
	const alreadySubmitted = await Review.findOne({
		book: bookId,
		user: req.user.userId,
	})
	if (alreadySubmitted) {
		throw new CustomError.BadRequestError('Already submitted review for this book')
	}
	req.body.user = req.user.userId
	const review = await Review.create({ ...req.body })
	res.status(StatusCodes.CREATED).json({ review })
}

const getAllReviews = async (req, res) => {
	const reviews = await Review.find({})
		.populate({ path: 'book', select: 'name company' })
		.populate({ path: 'user', select: 'name' })
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

const getSingleReview = async (req, res) => {
	const { id: reviewId } = req.params
	const review = await Review.findOne({ _id: reviewId })
	if (!review) {
		throw new CustomError.NotFoundError(`No review with id : ${reviewId}`)
	}
	res.status(StatusCodes.OK).json({ review })
}

const updateReview = async (req, res) => {
	const { id: reviewId } = req.params
	const { rating, title, comment } = req.body
	const review = await Review.findOne({ _id: reviewId })
	if (!review) {
		throw new CustomError.NotFoundError(`No review with id : ${reviewId}`)
	}
	checkPermissions(req.user, review.user)
	review.rating = rating
	review.title = title
	review.comment = comment
	await review.save()
	res.status(StatusCodes.OK).json({ review })
}

const deleteReview = async (req, res) => {
	const { id: reviewId } = req.params
	const review = await Review.findOne({ _id: reviewId })
	if (!review) {
		throw new CustomError.NotFoundError(`No review with id : ${reviewId}`)
	}
	checkPermissions(req.user, review.user)
	await review.remove()
	res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' })
}

const getSingleBookReviews = async (req, res) => {
	const { id: bookId } = req.params
	const reviews = await Review.find({ book: bookId })
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

module.exports = {
	createReview,
	getAllReviews,
	getSingleReview,
	updateReview,
	deleteReview,
	getSingleBookReviews,
}
