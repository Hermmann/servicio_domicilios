const { default: mongoose } = require('mongoose');
const ProductSchema = require('../models/product');

const createProduct = async (req, res) => {
    const {name, description, price, restaurant_id, category} = req.body;

    if (!name || !price || !restaurant_id || !category) {
        return res.status(400)
        .send({message: "Missing like name, price, ID of the restaurant or category"});
    }

    try {
        const product = new ProductSchema({name, description, price, restaurant_id, category});
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
        const product = await ProductSchema.findById(id);
        !product? res.status(404).send({message: "¡Product not found!"}) : res.status(200).json(product);

    } catch (error) {
        console.error.log(error);
        res.status(500).send({message: error});
    }
}

const getProductsByRestaurantIdOrCategory = async (req,res) => {
    const { category, restaurant_id } = req.query;
    console.log(restaurant_id);
    
    try {    
        const query = {};

        if (category) {
            query.category = { $regex: new RegExp(category, 'i') };
        }
        
        if (restaurant_id) {
            query.restaurant_id = restaurant_id;
        }
        
        const products = await ProductSchema.find(query);
            
            res.status(200).json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Error fetching restaurants");
    }
}

const updateProduct = async (req, res) => {

    const id = req.params.id;
    await ProductSchema.findByIdAndUpdate(id, req.body, {new: true})
    .then((data => 
        !data? res.status(404).send({message: "Restaurant not found"}) : 
        res.status(200).json({message: "restaurant updated",data})))
        .catch(() => { 
            res.status(500).send({ message: "Error updated restaurant's fields" })
        });
}

const deleteProduct = async (req,res) => {
    const id = req.params.id;
    await ProductSchema.findByIdAndDelete(id).then(document => {
        !document? res.status(404).send({message:"Product not fount"}) : 
        res.status(200).send({message: "Product deleted", document})
    }).catch(() => {
        res.status(500).send({message: "Error deleting a product"});
    });
}

module.exports = {
    createProduct,
    getProduct,
    getProductsByRestaurantIdOrCategory,
    updateProduct,
    deleteProduct,
}