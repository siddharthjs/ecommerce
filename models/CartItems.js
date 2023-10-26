const Sequelize = require("sequelize")

const {sequelize} = require("../util/database")



const CartItems = sequelize.define('cartItems', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	productId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'products',
			key: 'id'
		}
	},
	cartId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'carts',
			key: 'id'
		}
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1
	},
	productPrice: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false
	}
})



module.exports = CartItems