const express = require("express")
const path = require("path")
const rootDir = require("../util/path")
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middleware/auth")
const upload = require("../util/file")

const router = express.Router()

router.get("/add-product", authMiddleware, adminController.getAddProduct)

router.post("/add-product", authMiddleware, upload.single('productImage'), adminController.postAddProduct)

router.get("/products", adminController.getProducts)

router.get("/edit-product/:id", authMiddleware, adminController.getEditProduct)

router.post("/edit-product", adminController.postEditProduct)
// router.patch("/edit-product", adminController.patchEditProduct)

router.post("/delete-product", adminController.deleteProduct)

module.exports = router