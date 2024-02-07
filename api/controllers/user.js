const {request} = require('../app');

const User = require('../models/user');
// console.log(User.id);

const createUser = async (req, res) => {
    const {name, surname, email, password} = req.body;
    try {
        const user = new User({name, surname, email, password});
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);

    }
}

const getUser = async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    
    !user? res.status(404).send({message: 'The user doesnt exist'}) : res.send(user);
 
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
    createUser
}
