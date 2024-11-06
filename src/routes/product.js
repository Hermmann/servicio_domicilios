const express = require('express');
const ProductController = require('../controllers/product');

const router = express.Router();

router.post('/products', ProductController.createProduct);
router.get('/products/:id', ProductController.getProduct);
router.get('/products', ProductController.getProductsByRestaurantIdOrCategory);

module.exports = router;