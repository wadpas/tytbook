const CustomError = require('../errors')
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
	const token = req.signedCookies.token
	if (!token) {
		throw new CustomError.UnauthenticatedError('No token provided')
	}
	try {
		const { name, userId, role } = jwt.verify(token, process.env.JWT_SECRET)
		req.user = { name, userId, role }
		next()
	} catch (error) {
		throw new CustomError.UnauthenticatedError('Authentication Invalid')
	}
}

const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new CustomError.UnauthorizedError('Unauthorized to access this route')
		}
		next()
	}
}

module.exports = { authenticateUser, authorizePermissions }
