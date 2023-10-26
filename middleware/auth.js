const {verify} = require("../util/jwt")
require("dotenv").config()

module.exports = (req, res, next) => {
	const token = req.cookies.jwt

	if(!token){
		return res.status(404).json({messsage: 'Not authenticated'})
	}

	let decodedToken
	try{
		decodedToken = verify(token, process.env.SECRET_KEY)
	}
	catch(error){
		return res.status(404).json({messsage: 'Token validation failed!'})
	}

	req.userId = decodedToken.userId
	next()
}