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

module.exports = {
    createOrder,
}