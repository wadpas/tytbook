const { createJWT, isToken, attachCookiesToResponse } = require('./jwt')
const checkPermissions = require('./checkPermissions')
const sendVerificationEmail = require('./sendVerificationEmail')
const sendResetPasswordEmail = require('./sendResetPasswordEmail')

module.exports = {
	createJWT,
	isToken,
	attachCookiesToResponse,
	checkPermissions,
	sendResetPasswordEmail,
	sendVerificationEmail,
}
