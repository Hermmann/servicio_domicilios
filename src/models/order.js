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
    realizadoByUser: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    restauran_id: {type: Schema.Types.ObjectId, ref: 'Restaurant', require: true},
})


module.exports = mongoose.model('Order', OrderSchema);