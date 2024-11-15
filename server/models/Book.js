const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Title field is required'],
			maxlength: [200, 'Title field cannot be more than 200 characters'],
			trim: true,
			required: true,
		},
		author: {
			type: String,
			required: [true, 'Author field is required'],
			maxlength: [200, 'Author field cannot be more than 200 characters'],
			trim: true,
			required: true,
		},
		description: {
			type: String,
			required: [true, 'Please provide product description'],
			maxlength: [2000, 'Description cannot be more than 1000 characters'],
			trim: true,
			required: true,
		},
		genre: {
			type: [String],
			trim: true,
			required: true,
		},
		image: {
			type: String,
			default: '/book-placeholder.png',
			trim: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Book', BookSchema)
