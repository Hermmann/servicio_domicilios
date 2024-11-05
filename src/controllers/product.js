const { default: mongoose } = require('mongoose');
const productSchema = require('../models/product');

const createProduct = async (req, res) => {
    const {name, description, price, restaurant_id, category} = req.body;

    if (!name || !price || !restaurant_id || !category) {
        return res.status(400).send({message: "Missing like name, price, ID of the restaurant or category"});
    }

    try {
        const product = new productSchema({name, description, price, restaurant_id, category});
        await product.save();
        res.status(201).json(product);

    } catch (error) {
        console.error.log(error);
        res.status(500).send({message: "Error while creating a product"});
    }
}

const getProduct = async (req,res) => {
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message: "The ID format is no valid"});
        }
        const product = await productSchema.findById(id);
        !product? res.status(404).send({message: "¡Product not found!"}) : res.status(200).json(product);

    } catch (error) {
        console.error.log(error);
        res.status(500).send({message: error});
    }
}

module.exports = {
    createProduct,
    getProduct,
}