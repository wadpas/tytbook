const User = require('../models/User')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { attachCookiesToResponse, sendVerificationEmail } = require('../utils')
const crypto = require('crypto')

const register = async (req, res) => {
	const { name, email, password } = req.body
	const emailAlreadyExists = await User.findOne({ email })
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError('Email already exists')
	}
	const isFirstAccount = (await User.countDocuments({})) === 0
	const role = isFirstAccount ? 'admin' : 'user'
	const verificationToken = crypto.randomBytes(40).toString('hex')
	const user = await User.create({ name, email, password, role, verificationToken })

	const origin = 'http://localhost:3000'
	await sendVerificationEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken,
		origin,
	})

	res.status(StatusCodes.CREATED).send({
		msg: 'Success! Please verify your email',
		verificationToken: user.verificationToken,
	})
}

const verifyEmail = async (req, res) => {
	const { verificationToken, email } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		throw new CustomError.UnauthenticatedError('Verification Failed')
	}
	if (user.verificationToken !== verificationToken) {
		throw new CustomError.UnauthenticatedError('Verification Failed')
	}
	user.isVerified = true
	user.verified = Date.now()
	user.verificationToken = ''
	await user.save()
	res.status(StatusCodes.OK).send('Email Verified')
}

const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new CustomError.BadRequestError('Please provide email and password')
	}
	const user = await User.findOne({ email }).select('+password')
	if (!user) {
		throw new CustomError.UnauthenticatedError('Invalid Credentials')
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid Credentials')
	}
	if (!user.isVerified) {
		throw new CustomError.UnauthenticatedError('Please verify your email to login')
	}
	const tokenUser = { userId: user._id, name: user.name, role: user.role }
	attachCookiesToResponse({ res, user: tokenUser })
	res.status(StatusCodes.OK).send({ user: tokenUser })
}

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	})
	res.status(StatusCodes.OK).send('User logged out!')
}

module.exports = {
	register,
	login,
	logout,
	verifyEmail,
}
