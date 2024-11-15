const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { createBook, getBooks, getBook, updateBook, deleteBook, uploadImage } = require('../controllers/books')

const { getSingleBookReviews } = require('../controllers/reviews')

router
	.route('/')
	.get(getBooks)
	.post([authenticateUser, authorizePermissions('admin')], createBook)
router
	.route('/:id')
	.get(getBook)
	.patch([authenticateUser, authorizePermissions('admin')], updateBook)
	.delete([authenticateUser, authorizePermissions('admin')], deleteBook)
router.route('/uploadImage').post([authenticateUser, authorizePermissions('admin')], uploadImage)

router.route('/:id/reviews').get(getSingleBookReviews)

module.exports = router
