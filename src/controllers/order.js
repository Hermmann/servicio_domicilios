const { default: mongoose } = require('mongoose');
const OrderSchema = require('../models/order');

const createOrder = async (req, res) => {
    const {
        sendByUser,
        product,
        deliveryAddress,
        realizadoByUser,
        restaurant_id
    } = req.body;
    
    if(!sendByUser || !deliveryAddress || !restaurant_id){
        return res.status(400).send({message: "missing parameters"});
    }

    try {
        const order = new OrderSchema({
            sendByUser, product, deliveryAddress, realizadoByUser,
        });
        
        await order.save();
        res.status(201).json(order);

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error while creating a order"})
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message: "No valid ID format"});
        }
        const order = await OrderSchema.findById(id);
        !order? res.status(404).send({message: "Order not found"}) : res.status(200).json(order);

    } catch (error) {
        console.error(error)
        res.status(500).send({message: error});
    }
}

module.exports = {
    createOrder,
    getOrderById,
}