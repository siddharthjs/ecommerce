const Product = require("../models/Product")

exports.getAddProduct = function(req, res){
	res.render("admin/edit-product.ejs", {product: undefined, pageTitle: "Add product", userId: req.session.userId})
}

exports.postAddProduct = async function(req, res){

	const title = req.body.title
	const imageURL = req.file.path
	const description = req.body.description
	const price = req.body.price
	
	
	// const product = new Product(null, req.body.title, req.body.price,  req.body.imageURL, req.body.description)
	// product.save().then(function(data){
	// 	console.log(data)
	// }).catch(function(err){
	// 	console.log(err)
	// })
	// // products.push({title: req.body.title, date: new Date()})
	// res.redirect("/")


	// Product.create({id:null, title:req.body.title, price:req.body.price, imageURL: req.body.imageURL, description: req.body.description}).then(function(){
	// 	res.redirect("/")
	// }).catch(function(err){
	// 	console.log(err)
	// })

	try{
		await Product.create({title:title, price:price, imageURL: imageURL, description:description})
		res.redirect("/")
	}
	catch(error){
		console.log("Error adding product: ", error)
	}
}

exports.getProducts = async function(req, res){
	// Product.fetchAll().then(function(products){
	// 	// console.log(products[0])
	// 	res.render("admin/products.ejs", {products: products[0], pageTitle: "All products"})
	// }).catch(function(err){
	// 	res.send("Error occured: " + err)
	// })
	try{
		const products = await Product.findAll()
		res.render("admin/products.ejs", {products: products, pageTitle: "All products", userId: undefined})
	}
	catch(error){
		console.log(error)
	}
}

exports.getEditProduct = async function(req, res){
	const productId = req.params.id
	console.log(productId)
	// Product.fetchById(productId).then(function(product){
	// 	console.log(product)
	// 	res.render("admin/edit-product.ejs", {product: product[0][0], pageTitle: `Edit ${product.title}`})
	// }).catch(function(err){
	// 	console.log(err)
	// })
	try{
		const product = await Product.findByPk(productId)
		res.render("admin/edit-product.ejs", {product: product, pageTitle: `Edit ${product.title}`, userId: undefined})
	}
	catch(error){
		console.log(error)
	}
}

exports.postEditProduct = async function(req, res){

	const {id, title, price, imageURL, description} = req.body	

	try{
		// const product = await Product.findByPk(id)
		// product.title = title
		// product.price = price
		// product.imageURL = imageURL
		// product.description = description

		// await product.save()
		// res.redirect("/admin/products")

		await Product.update(
			{
				title: title,
				price: price,
				imageURL: imageURL,
				description: description
			},
			{
				where: {id: id}
			}
		)

		res.redirect("/admin/products")
	}
	catch(error){
		console.log(error)
	}

	// product.save().then(function(data){	
	// 	console.log(data)
	// 	res.redirect("/")
	// }).catch(function(err){
	// 	console.log(err)
	// })
}

exports.deleteProduct = async function(req, res){
	const productId = req.body.id
	try{
		const product = await Product.findByPk(productId)
		if(!product){
			const error = new Error("Product not found!")
			throw error
		}
		await product.destroy()

		// await Product.destroy({where: {id:productId}})
		res.redirect("/admin/products")
	}
	catch(error){
		console.log(error)
	}
}