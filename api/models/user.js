let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    name: {String, require: true},
    surname: {String, require: true},
    email: {String, require: true},
    password: {String, require: true}
});

//This is for export the model for use it in another folders
module.exports = mongoose.model('User', UserSchema);


