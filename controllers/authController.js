const bcrypt = require("bcrypt")
const {sign} = require("../util/jwt")
const {check, validationResult} = require('express-validator')


const User = require("../models/User")
const { Sequelize } = require("sequelize")

exports.getSignup = (req, res) => {
	console.log("Session data: ",req.session.userId)
	if(req.session.userId){
		res.render("shop/product-list.ejs", {products: [], pageTitle: "Product List!", userId: req.session.userId})
	}
	else{
		res.render("auth/signup.ejs", {pageTitle: "Sign up!", userId: undefined})
	}
	
}



exports.postSignup = async (req, res) => {
	console.log("Before: ", req.body)
	const email = req.body.email
	const password = req.body.password

	// check('email').isEmail().withMessage('Please enter a valid email!')

	// check('password').isLength({min: 6}).withMessage('Password should be at least 6 characters!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/)

	// const errors = validationResult(req)
	// if(errors){
	// 	throw new Error(errors)
	// }

	console.log("The data is: ", email, password)

	try{
		const existingUser = await User.findOne({where: {email: email}})

		if(existingUser){
			res.render("auth/signup.ejs", {pageTitle: "Sign up!"})
		}

		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/;
		if(!regex.test(password)){
			throw new Error('Password should at least contain one uppercase letter, one lowercase letter, one digit, and one special character')
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		await User.create({
			email: email,
			password: hashedPassword
		})
		req.flash("success", "You are successfully registered! Please sign in.")
		res.redirect("/auth/signin")
		// console.log("The flash messages are: ", req.flash("success"))
		// res.render("auth/signin.ejs", {pageTitle: "Sign in", userId: undefined, messages: req.flash("success")})
	}catch(error){
		if(error instanceof Sequelize.ValidationError){
			req.flash('error', error.errors[0].message)
			res.redirect("/auth/signup")
		}
		else{
			req.flash('error', error)
			res.redirect("/auth/signup")
		}
		
	}
}

exports.getSigin = (req, res) => {
	
	if(req.session.userId){
		res.send("You are already logged in!")
	}
	else{
		res.render("auth/signin.ejs", {pageTitle: "Loginnn!", userId: undefined})
	}
}

exports.postSignin = async (req, res) => {
	const email = req.body.email
	const password = req.body.password

	console.log("The data is: ", email, password)

	try{
		const user = await User.findOne({where: {email: email}})
		if(!user){
			throw new Error("No user found!")
		}

		console.log("User ", user)
		console.log("passwords are: ", password, " ", user.password)

		const doMatch = await bcrypt.compare(password, user.password)

		console.log(doMatch)
		if(doMatch){
			// req.userId = user.id
			req.session.userId = user.id
			req.flash('success', 'You are logged in!')
			req.flash('success', 'Time to shop now!')
			// When the user is validated
			const token = sign({userId: user.id}, process.env.SECRET_KEY, '1h')

			console.log("The token is: ", token)
			res.cookie('jwt', token, {httpOnly: false, maxAge: 1*60*60*1000}).redirect("/")
			// res.status(200).json({token: token})

		}
		else{
			let errors = []
			// req.flash('error', 'Please enter correct credentials!')
			// req.flash('error', 'Please purchase Almonds!')
			errors.push("Please enter correct credentials!")
			res.render("auth/signin.ejs", {pageTitle: "Signin page", userId: "undefined"})
		}

	}
	catch(error){
		console.log(error)
	}
}

exports.logoutUser = function(req, res){
	req.session.destroy(function(err){
		if(err){
			console.log(err)
		}
		res.redirect("/")
	})
}