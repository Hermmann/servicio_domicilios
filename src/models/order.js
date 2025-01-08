const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
    state: {
        type: String,
        enum: ['Creado', 'Enviado', 'Aceptado','Recibido', 'En direccion', 'Realizado'],
        required: true,
        default: 'Creado',
    },
    sendByUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    product: [{
        //product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
        name: String,
        amount: Number,
    }],
    deliveryAddress: {type: String, required: true},
    realizadoByUser: {type: Schema.Types.ObjectId, ref: 'User'},
    restaurant_id: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
    creationDate:{ type: Date, default: Date.now},
    updateDate: {type: Date, default: Date.now},
    totalPrice: {type: Number   }
},
{ timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
)
                    

module.exports = mongoose.model('Order', OrderSchema);  