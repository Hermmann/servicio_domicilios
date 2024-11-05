const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: {type: String, require: true},
    description: {type: String},
    price: {type: Number, require: true},
    restaurant_id: {type: Schema.Types.ObjectId, require: true},
    category: {type: String, require: true, lowercase:true},
});

module.exports = mongoose.model('Product', productSchema);