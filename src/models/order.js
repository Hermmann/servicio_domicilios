const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
    state: {
        type: String,
        enum: ['Creado', 'Enviado', 'Aceptado','Recibido', 'En direccion', 'Realizado'],
        require: true,
        default: 'Creado',
    },
    sendByUser: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    product: [{
        //product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
        name: String,
        amount: Number,
    }],
    deliveryAddress: {type: String, require: true},
    realizadoByUser: {type: Schema.Types.ObjectId, ref: 'User'},
    restaurant_id: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
    creationDate:{ type: Date, default: Date.now},
    updateDate: {type: Date, default: Date.now},
},
{ timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
)
                    

module.exports = mongoose.model('Order', OrderSchema);