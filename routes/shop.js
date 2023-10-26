const express = require("express")
const router = express.Router()
const shopController = require("../controllers/shopController")

router.get("/", shopController.getHomePage)

router.get("/product-list", shopController.getProducts)

router.get("/cart", shopController.getCartPage)

// router.get("/product/best-selling", x.y)

router.get("/product/:id", shopController.getProduct)

router.post("/add-to-cart", shopController.addToCart)

router.post("/show-product", shopController.showProduct)

router.post("/delete-product", shopController.deleteCartProduct)

module.exports = router