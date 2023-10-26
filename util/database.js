const Sequelize = require('sequelize')
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
require("dotenv").config("../.env")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {dialect: 'mysql', host: process.env.DB_HOST, logging: false})

const sessionStore = new SequelizeStore({
	db: sequelize,
	checkExpirationInterval: 15*60*1000,
	expiration: 1*60*40*1000
})

module.exports = {sequelize, sessionStore}