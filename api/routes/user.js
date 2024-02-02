let express = require('express');

//Here we upload the controllers
let UserController = require('../controllers/user');

//Here we call the router
let api = express.Router();

//We create a route for the methods in our controllers

api.get ('/user/:id', UserController.getUser);
api.post('/user/', UserController.createUser);

module.exports = api;
