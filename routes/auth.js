const express = require("express")
const router = express.Router()

const authController = require("../controllers/authController")

router.get("/signup", authController.getSignup)

router.post("/signup", authController.postSignup)

router.get("/signin", authController.getSigin)

router.post("/signin", authController.postSignin)

router.get("/logout", authController.logoutUser)

module.exports = router