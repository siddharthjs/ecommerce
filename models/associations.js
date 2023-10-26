const Product = require("../models/Product")
const Cart = require("../models/Cart")
const CartItems = require("../models/CartItems")
const User = require("../models/User")

CartItems.belongsTo(Product, {foreignKey: 'productId'})
CartItems.belongsTo(Cart, {foreignKey: 'cartId'})
Cart.belongsTo(User, {foreignKey: 'userId'})

Cart.hasMany(CartItems, {foreignKey: 'cartId'})
Product.hasMany(CartItems, {foreignKey: 'productId'})
User.hasOne(Cart, {foreignKey: 'userId'})