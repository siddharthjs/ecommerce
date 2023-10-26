const Sequelize = require('sequelize')

const {sequelize} = require('../util/database')

const User = sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	email:{
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}, 
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate : {
			len: [8, 125]
		}
	}
})

module.exports = User