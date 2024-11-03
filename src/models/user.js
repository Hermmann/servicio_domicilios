const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //This is a regular expresion for validate email
const UserSchema = Schema({
    name: {type: String, require: true},
    surname: {type: String, require: true},
    email: {
        type: String, 
        require: true,
        unique: true,
        validate: {
            validator: function (v) {
                return emailRegex.test(v);
            },
            message: props => `¡${props.value}  is not a valid email!`
        }
    },
    password: {type: String, require: true},
});

//This is for export the model for use it in another folders
module.exports = mongoose.model('User', UserSchema);


