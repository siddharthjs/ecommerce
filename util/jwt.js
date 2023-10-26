const jwt = require('jsonwebtoken')

exports.sign = (payload, secret, expiresIn) => {
	return jwt.sign(payload, secret, {expiresIn})
}

exports.verify = (token, secret) => {
	return jwt.verify(token, secret)
}