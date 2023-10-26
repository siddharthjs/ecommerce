const Sequelize = require("sequelize")

const {sequelize} = require("../util/database")

const Cart = sequelize.define('carts', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	totalPrice: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false
	}
})


module.exports = Cart