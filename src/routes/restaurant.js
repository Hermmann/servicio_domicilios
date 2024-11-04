const express = require('express');
const RestaurantController = require('../controllers/restaurant');
const { route } = require('./user');

router = express.Router();

router.post('/restaurants', RestaurantController.createRestaurant);
router.get('/restaurants/:id', RestaurantController.getRestaurant);
router.get('/restaurants',RestaurantController.restaurants)
router.put('/restaurants/:id', RestaurantController.updateRestaurant);
router.delete('/restaurants/:id', RestaurantController.deleteRestaurant);
module.exports = router;