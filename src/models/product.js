const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: {type: String, require: true},
    description: {type: String},
    price: {type: Number, require: true},
    restaurant_id: {type: Schema.Types.ObjectId, ref: 'Restaurant', require: true },
    category: {type: String, require: true, lowercase:true},
});

module.exports = mongoose.model('Product', ProductSchema);