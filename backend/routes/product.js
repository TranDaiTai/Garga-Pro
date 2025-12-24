// src/routes/products.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController')
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get("/:productId/reviews", reviewController.getReviewsByProductId)  

module.exports = router;