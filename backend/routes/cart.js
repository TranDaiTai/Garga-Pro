const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/middleware')
const cartController = require('../controllers/cartController')

router.post("/add", authMiddleware.authMiddleware, cartController.addToCart)

router.get("/", authMiddleware.authMiddleware, cartController.getCart)

router.post("/remove", authMiddleware.authMiddleware,cartController.removeFromCart) 

router.post("/update", authMiddleware.authMiddleware, cartController.updateCartItem)
module.exports = router;
