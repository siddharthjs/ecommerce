const express = require("express")
const path = require("path")
const ejs = require("ejs")
require("dotenv").config()
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")

const {sequelize} = require("./util/database")
const {sessionStore} = require("./util/database")
require("./models/CartItems")
require("./models/User")
require("./models/associations")


const server = express()

const adminRoutes = require("./routes/admin") // {}
const shopRoutes = require("./routes/shop")
const authRoutes = require("./routes/auth")
const errorController = require("./controllers/errorController")
const { appendFile } = require("fs")

// Middleware function

server.use(express.urlencoded({extended: false}))
server.use(express.json())

server.use("/images", express.static(path.join(__dirname, 'images')))

server.use((req, res, next) => {
    console.log('HTTP Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);
    next();
});


server.set("view engine", ejs)
server.set("views", "views")

server.use(express.static(path.join(__dirname, 'public')))

server.use((req, res, next) => {
	console.log("This is another middleware!")
	next()
})

server.use(cookieParser())

server.use(session({
	secret: 'Node.js is best',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false, maxAge: 1*60*60*1000 },
	store: sessionStore
  }))

server.use(flash())

server.use((req, res, next) => {
	res.locals.messages = req.flash()
	next()
})


server.use("/",shopRoutes)
server.use("/admin", adminRoutes)
server.use("/auth", authRoutes)


server.use(errorController.getError)

sequelize.sync().then((result)=>{
	console.log(result)

	const port = process.env.PORT

	server.listen(port, function(){
		console.log(`Server running at port ${port}`)
	})
}).catch((err) => {
	console.log(err)
})