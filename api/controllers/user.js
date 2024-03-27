const {request} = require('../app');

const User = require('../models/user');
// console.log(User.id);

const createUser = async (req, res) => {
    const {name, surname, email, password} = req.body;
    try {
        const user = new User({name, surname, email, password});
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);

    }
}
//Get a user based on the id or the email and password
const getUser = async (req, res) => {
    const {id, email, password} = req.query;
try {

    if (id != null) {

        const user = await User.findById(id);
        !user? res.status(404).send({message: 'The user doesnt exist'}) : res.status(200).send(user);
        

    }else if (email != null && password!=null) {
        const pipeline = [
            {$match: {"email":email, "password":password}}
        ];


        const user = await User.aggregate(pipeline);
        // const user = await User.findOne({email: email, password: password});
        // console.log(user.len);
            user.len == undefined? res.status(404).send({message: 'The user doesnt exist'}) : res.status(200).send(user);
    } else {
        res.status(404).send({message:'There were not provide user id or email and password'})
    }

} catch (error) {
    console.error(error);
        res.status(500).send(error);
    }
}

const getNumberUser = async (req, res)=> {
 try {
    const count = await User.countDocuments();
    
    
    res.status(200).send({userNumber: count});

 } catch (error) {
    
    res.status(500).send({message: 'server error'});
 }
}


// to get a specific user based in its id
// function getUser(req, res){
//     let userId = req.params.id;

//     //for search based in the user's id
//     User.findById(userId, (err, user) => {
//         if(err) return res.status(500).send({message: 'Error in petition'});

//         if (!user) return res.status(404).send({message: 'The user doen´t exist'});

//         return res.status(200).json(user);
//     });

//}

// function createUser(req, res) {
//     try {

//         const {name, surname, email, password} = req.body;
//         console.log('oldman');

//         const user = new User({
//             name, surname, email, password,
//         });

//         user.save().then((data) => res.status(200).json(data,)).catch((err) => res.json(err));

//     } catch (err) {
//         res.status(500).json({message: 'server error'});
//     }


// }

module.exports = {
    getUser,
    createUser,
    getNumberUser,
}
