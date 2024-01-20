let mongoose = require('mongoose');

//to load the app.js file with the express configuration
let app = require('./app');

let port = 3800;

//For let a indication to mongoose that I will make a connection with promises
 mongoose.Promise = global.Promise;

 //here is the connection to the database
 mongoose.connect('mongodb+srv://hermmann:hermmann@cluster0.27btuae.mongodb.net/?retryWrites=true&w=majority')
 .then(() => {console.log("succefull")
    app.listen(port, () => {console.log("connection at port 3800");})
})
.catch(err => console.log(err));
