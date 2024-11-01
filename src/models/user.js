const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {type: String, require: true},
    surname: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
});

//This is for export the model for use it in another folders
module.exports = mongoose.model('User', UserSchema);


