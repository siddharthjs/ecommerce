const Sequelize = require('sequelize')
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
require("dotenv").config("../.env")

const sequelize = new Sequelize('ecommerce-sequelize', 'root', 'Root@123', {dialect: 'mysql', host: 'localhost', logging: false})

const sessionStore = new SequelizeStore({
	db: sequelize,
	checkExpirationInterval: 15*60*1000,
	expiration: 1*60*40*1000
})

module.exports = {sequelize, sessionStore}