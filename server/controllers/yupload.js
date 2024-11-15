const { StatusCodes } = require('http-status-codes')
const path = require('path')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const { BadRequestError, NotFoundError } = require('../../../covers/server/errors')

const uploadProductImage = async (req, res) => {
	if (!req.files) {
		throw new BadRequestError('No File Uploaded')
	}
	const productImage = req.files.image
	if (!productImage.mimetype.startsWith) {
		throw new BadRequestError('Please Upload Image')
	}
	const maxSize = 2024 * 2024
	if (productImage.size > maxSize) {
		throw new BadRequestError('Please upload image smaller than 4MB')
	}
	const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
	await productImage.mv(imagePath)
	res.status(StatusCodes.OK).json({ imageUrl: `../uploads/${productImage.name}` })
}

cloudinaryProductImage = async (req, res) => {
	const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
		use_filename: true,
		folder: 'file-upload',
	})
	fs.unlinkSync(req.files.image.tempFilePath)
	res.status(StatusCodes.OK).json({ imageUrl: result.secure_url })
}

module.exports = {
	uploadProductImage,
	cloudinaryProductImage,
}
