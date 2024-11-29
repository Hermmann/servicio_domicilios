const express = require('express');
const OrderController = require('../controllers/order');

const router = express.Router();

router.post('/orders', OrderController.createOrder);
router.get('/orders/:id', OrderController.getOrderById);
router.get('/orders', OrderController.getOrdersByRealizedOrSendByUserOrRestaurantBetweenDates);


module.exports = router;