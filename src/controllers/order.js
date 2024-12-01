const { default: mongoose } = require('mongoose');
const OrderSchema = require('../models/order');
const { json } = require('body-parser');

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
                $gte: new Date(startDate).setHours(0, 0, 0, 0),
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

const getSinAceptarOrders = async (req, res) => {

    try {

        const sinAceptarOrders = await OrderSchema.find({ state: { $ne: 'Aceptado' } });

        if (!sinAceptarOrders) {
            return res.status(404).send({ message: "Todas los pedidos fueron aceptados" });
        }

        res.status(200).json(sinAceptarOrders);

    } catch (error) {
        console.error(error);
        res.status(500).json("Error buscando ordenes sin aceptar");
    }
}

const updateOrder = async (req, res) => {

    const order_id = req.params.id;
    const sendByUser = req.query.sendByUser;
    const realizadoByUserQuery = req.query.realizadoByUser;
    const body = req.body;

    //I have to validate the order cannot be updated after being "Enviado" by the sendUser  (completed)
    //I need to modify the code for actualize the "updateDate" field, once the order is modify (completed)
    //Only the realizadoUser can update de order after being "Enviado", but only the state field (completed)

/*     if (Object.keys(body).length === 0) {
        return res.status(400).send({ message: "There is no data to update any order" });
    }
 */
    try {
        // Buscar el documento sin modificar
        const data = await OrderSchema.findById(order_id);
        if (!data) {
            return res.status(404).send({ message: "Order not found" });
        }

        // Validaciones previas al update
        if (!body.realizadoByUser) {
            if (!realizadoByUserQuery) {
                //console.log(data.sendByUser.toString());
                if (data.state !== 'Enviado' && data.sendByUser.toString() === sendByUser) {
                    // Actualización permitida
                    const updatedOrder = await OrderSchema.findByIdAndUpdate(order_id, body, { new: true });
                    
                    return res.status(200).json({ message: "Updated order", data: updatedOrder });
                }
                return res.status(400).send({ message: "The order's status is 'Enviado' or sendUser mismatch" });
            }

            if ((!['Creado', 'Enviado'].includes(body.state || '')) && // the first part equivalent to body.state !== 'Creado' && body.state !== 'Enviado' 
                !body.product && !body.deliveryAddress) {    // the '' validate that body.stat could be undefine
                
                const updatedOrder = await OrderSchema.findByIdAndUpdate(order_id, body, { new: true });
                return res.status(200).json({ message: "Updated state", data: updatedOrder });
            }

            return res.status(400).send({
                message: "You cannot choose 'Creado' or 'Enviado' after accepting the order, or change product/address as domiciliary"
            });
        }

        if (body.state === 'Aceptado') {
            const updatedOrder = await OrderSchema.findByIdAndUpdate(order_id, body, { new: true });
            return res.status(200).json({ message: "You accepted the order", data: updatedOrder });
        }

        return res.status(400).send({
            message: "Missing user or invalid state change"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error updating order" });
    }
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;

    await OrderSchema.findByIdAndDelete(id).then(data => {
        !data ? res.status(404).send({ message: "Order not found" }) :
            res.status(200).json({ message: "Order deleted", data })
    }).catch(() => {
        res.status(500).send({ message: "Server error" })
    });
}





module.exports = {
    createOrder,
    getOrderById,
    getOrdersByRealizedOrSendByUserOrRestaurantBetweenDates,
    getSinAceptarOrders,
    updateOrder,
    deleteOrder,
}