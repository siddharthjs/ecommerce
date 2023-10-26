const Product = require("../models/Product")
const Cart = require("../models/Cart")
const CartItems = require("../models/CartItems")

exports.getHomePage = function(req, res){
	res.render("shop/index.ejs", {pageTitle: "Best online store!", userId: undefined})
}

exports.getProducts = function(req, res){

	Product.findAll().then(function(products){
		res.render("shop/product-list.ejs", {products: products, pageTitle: "Shop", userId: undefined})
	}).catch(function(err){
		res.send("Error occured: " + err)
	})
}

// exports.getCartPage = async function(req, res) {
// 	try {
// 		const cart = await Cart.findOne({where: {userId: 1}})

// 		if(!cart){
// 			throw Error("No cart found!")
// 		}

// 		const cartItems = await CartItems.findAll({where: {cartId: cart.id}})
// 		const productIds = cartItems.map(function(item){
// 			return item.productId
// 		})

// 		const products = await Product.findAll({where: {id: productIds}})

// 		console.log("The products are: ", products)

// 		res.render("shop/cart.ejs", {
// 			cart: products,
// 			pageTitle: "Your cart!"
// 		})
// 	} catch (err) {
// 	  console.log(err);
// 	}
//   };


exports.getCartPage = async function(req, res) {
	try {
		const userId = 1

		// Fetch the cart from the user witgh ID = 1
		const cart = await Cart.findOne({where: {userId: userId}})

		if(!cart){
			throw new Error("Cart not found!")
		}

		const cartItems = await cart.getCartItems({include: [Product]})

		console.log("Cart Items: ", cartItems)

		const products = cartItems.map(item => item.product)

		res.render("shop/cart.ejs", {
						cart: products,
						pageTitle: "Your cart!",
						userId: undefined
					})
	} catch (err) {
	  console.log(err);
	}
  };

exports.getProduct = function(req, res){
	const productId = req.params.id
	console.log(productId)
	Product.findByPk(productId).then(function(product){
		// console.log(product)
		res.render("shop/product-detail.ejs", {product: product, pageTitle: product.title, userId: undefined})
	}).catch(function(err){
		console.log("Error " + err)
	})
}

exports.addToCart = async function(req, res){
	const productId = req.body.productId
	console.log(`This is the product ID ${productId}`)
	const productPrice = req.body.productPrice
	console.log("The product price is: ", productPrice)

	let fetchedCart;
	let newQuantity = 1

	try{
		const cart = await Cart.findOne({where: {userId: 1}})
		if(!cart){
			fetchedCart = await Cart.create({userId: 1, totalPrice: 0})
		}
		else{
			fetchedCart = cart
		}

		console.log("The fetched cart is: ", fetchedCart)

		const existingCartItem = await CartItems.findOne({where: {productId: productId}}) 

		if(existingCartItem){
			newQuantity = existingCartItem.quantity + 1
			await existingCartItem.update({quantity: newQuantity})
		}
		else{
			await CartItems.create({productId: productId, cartId: fetchedCart.id, quantity: 1, productPrice: productPrice})
		}

		let cartTotalPrice = Number(fetchedCart.totalPrice) + Number(productPrice)
		await fetchedCart.update({totalPrice: cartTotalPrice})
	}
	catch(error){
		console.log(error)
	}

}

exports.showProduct = function(req, res){
	const productId = req.body.id
	console.log(productId)
	Product.fetchById(productId).then(function(product){
		res.render("shop/product-detail.ejs", {product: product, pageTitle: product.title, userId: undefined})
	}).catch(function(err){
		console.log("Error " + err)
	})
}

exports.deleteCartProduct = async function(req, res){
	const productId = req.body.id
	const productPrice = req.body.price
	const productQty = req.body.qty
	console.log(productId)

	try{
		// 1. Find the user's cart
	const cart = await Cart.findOne({where: {userId: 1}})

	if(!cart){
		throw new Error('Cart not found!')
	}

	

	// 2. Find the specific cart item
	const cartItem = await CartItem.findOne({where: {productId:productId}})

	// 3. Adjust the totalPrice of the cart
	const decreaseAmount = productPrice * productQty
	await cart.update({totalPrice: cart.totalPrice - decreaseAmount})

	// 4. Remove the cart item
	await cartItem.destroy()
	}
	catch(error){
		console.log(error)
	}
}