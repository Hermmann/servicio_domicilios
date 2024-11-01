const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//To parse incoming json from the body 
app.use(express.json());


//routes
const user_routes = require('./routes/user');

//we charge the routes
app.use('/api/', user_routes);

const port = 3800;

// For let a indication to mongoose that I will make a connection with promises
mongoose.Promise = global.Promise;

// here is the connection to the database
mongoose
.connect(
    'mongodb+srv://hermmann:hermmann@cluster0.27btuae.mongodb.net/?retryWrites=true&w=majority'
    ).then(() => {
    console.log("succefull")
    app.listen(port, () => {
        console.log("connection at port 3800");
    })
}).catch(err => console.log('err', err));


