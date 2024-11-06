const express = require('express');
const ProductController = require('../controllers/product');

const router = express.Router();

router.post('/products', ProductController.createProduct);
router.get('/products/:id', ProductController.getProduct);
router.get('/products', ProductController.getProductsByRestaurantIdOrCategory);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;