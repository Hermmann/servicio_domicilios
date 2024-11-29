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

    if (!sendByUser || !deliveryAddress || !restaurant_id) {
        return res.status(400).send({ message: "missing parameters" });
    }

    try {
        const order = new OrderSchema({
            sendByUser, product, deliveryAddress, realizadoByUser, restaurant_id
        });

        await order.save();
        res.status(201).json(order);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error while creating a order" })
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "No valid ID format" });
        }
        const order = await OrderSchema.findById(id);
        !order ? res.status(404).send({ message: "Order not found" }) : res.status(200).json(order);

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error });
    }
}

const getOrdersByRealizedOrSendByUserOrRestaurantBetweenDates = async (req, res) => {
    const { realizedByUser, sendByUser, restaurant_id, startDate, endDate 
    } = req.query;
    
    try {
        const query = {}

        if (realizedByUser) {
            query.realizadoByUser = realizedByUser;
        }

        if (sendByUser) {
            query.sendByUser = sendByUser;
        }

        if (restaurant_id) {
            query.restaurant_id = restaurant_id;
        }

        if (startDate && endDate) {

            query.creationDate = {
                    $gte: new Date(startDate).setHours(0,0,0,0),
                    $lte: new Date(endDate).setHours(23, 59, 59, 999)
                
            }
        }
        console.log(query);
        const order = await OrderSchema.find(query);
        //const order = await OrderSchema.find({creationDate: {$in: new Date(startDate)}});
        //console.log(order);
        res.status(200).json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json("Error fetching order");
    }

}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByRealizedOrSendByUserOrRestaurantBetweenDates,
}