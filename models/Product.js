const Sequelize = require("sequelize")

const {sequelize} = require("../util/database")

const Product = sequelize.define('products', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false
	},
	imageURL: {
		type: Sequelize.STRING,
		allowNull: false
	}, description: {
		type: Sequelize.TEXT,
		allowNull: false
	}
})


module.exports = Product