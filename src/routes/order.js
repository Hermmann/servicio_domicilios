const express = require('express');
const OrderController = require('../controllers/order');

const router = express.Router();

router.post('/orders', OrderController.createOrder);
router.get('/orders/order/:id', OrderController.getOrderById);
router.get('/orders', OrderController.getOrdersByRealizedOrSendByUserOrRestaurantBetweenDates);
router.get('/orders/order', OrderController.getSinAceptarOrders);
router.put('/orders/order/:id', OrderController.updateOrder);

module.exports = router;