const mongoose = require('mongoose');
const RestaurantSchema = require('../models/restaurant');
const { message } = require('statuses');

const createRestaurant = async (req, res) => {
    if (!req.body.name || !req.body.address || !req.body.category) {
        return res.status(400).send({ message: "Bad request" });
    }

    try {
        const { name, address, category } = req.body;
        const restaurant = new RestaurantSchema({ name, address, category });
        await restaurant.save();
        res.status(201).send({ message: "A restaurant has been created", restaurant });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getRestaurant = async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format" });
        }
        const restaurant = await RestaurantSchema.findById(id);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant doesn't exist" })
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).send({ message: "error message", error });
    }
}

const restaurants = async (req, res) => {
    const { category, name } = req.query;
    try {
        
            const restaurants  = await RestaurantSchema.find({
                $or: [
                    {category: RegExp(category, 'i'), name: new RegExp(name, 'i')}
                ]
            })
            
            res.status(200).json(restaurants);
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Error fetching restaurants");
    }
}

module.exports = {
    createRestaurant,
    getRestaurant,
    restaurants,
}