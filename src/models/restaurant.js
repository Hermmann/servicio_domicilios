const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = Schema({
    name: {type:String, require: true},
    address: {type: String, require: true, lowercase: true},
    category: {type: String, require: true, lowercase: true},
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
