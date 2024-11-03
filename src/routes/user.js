const express = require('express');

//Here we upload the controllers
const UserController = require('../controllers/user');

//Here we call the router
const router = express.Router();

//We create a route for the methods in our controllers
router.get ('/users/user', UserController.getUser);
router.post('/users', UserController.createUser);
router.get('/users', UserController.getNumberUser);
router.put('/users/:id', UserController.updateUser);


module.exports = router;
