const { StatusCodes } = require('http-status-codes')
const Product = require('../../../covers/server/models/Product')

const getAllProducts = async (req, res) => {
	console.log(req.query)

	const { featured, categoryId, name, sort, fields, numericFilters } = req.query
	const queryObject = {}

	if (featured) {
		queryObject.featured = featured === 'true' ? true : false
	}
	if (categoryId) {
		queryObject.categoryId = categoryId
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' }
	}

	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte',
		}
		const regEx = /\b(<|>|>=|=|<|<=)\b/g
		let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
		const options = ['price', 'rating']
		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-')
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) }
			}
		})
	}

	let result = Product.find(queryObject)

	if (sort) {
		const sortList = sort.split(',').join(' ')
		result.sort(sortList)
	} else {
		result.sort('createdAt')
	}

	if (fields) {
		const fieldsList = fields.split(',').join(' ')
		result.select(fieldsList)
	}
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 100
	const skip = (page - 1) * limit
	result = result.skip(skip).limit(limit)

	const products = await result
	res.status(200).json({ products })
}

const createProduct = async (req, res) => {
	const product = await Product.create(req.body)
	res.status(StatusCodes.CREATED).json({ product })
}

const addProducts = async (req, res) => {
	const products = await Product.insertMany(req.body)
	res.status(StatusCodes.CREATED).json({ products })
}

module.exports = {
	getAllProducts,
	createProduct,
	addProducts,
}
