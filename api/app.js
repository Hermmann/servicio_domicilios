let express = require('express');

let app = express();

let user_routes = require('./routes/user');
const bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({extended}));
app.use(bodyParser.json());

//we charge the routes
app.use('/api', user_routes);


module.exports = app;