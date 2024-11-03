const express = require('express');
const RestaurantController = require('../controllers/restaurant');
const { route } = require('./user');

router = express.Router();

router.post('/restaurant', RestaurantController.createRestaurant);
router.get('/restaurant/:id', RestaurantController.getRestaurant);
module.exports = router;