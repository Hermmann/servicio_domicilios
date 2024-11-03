const { request } = require('../app');
const mongoose = require("mongoose");


const User = require('../models/user');
const { json } = require('body-parser');
const { message } = require('statuses');
const { options } = require('../routes/user');
// console.log(User.id);

const createUser = async (req, res) => {

    if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Missing parameters like name, surname, email or password" });
    }
    try {

        const { name, surname, email, password } = req.body;
        const user = new User({ name, surname, email, password });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error."});

    }
}


const getUser = async (req, res) => {
    const { id, email, password } = req.query;

    try {

        if (id) {

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid user ID format" });
            }

            const user = await User.findById(id, { _id: 0, email: 1, name: 1, surname: 1 });
            if (!user) {
                return res.status(404).json({ message: "The user doesn't exist" });
            }
            return res.status(200).json(user);


            // If no ID is provided, try with email and password
        } else if (email && password) {
            const user = await User.findOne({ email: email, password: password },
                { _id: 0, name: 1, surname: 1, email: 1 });
            if (!user) {
                return res.status(404).json({ message: "The user doesn't exist" });
            }
            return res.status(200).json(user);


        } else {
            return res.status(400).json({ message: "User ID or email and password must be provided" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getNumberUser = async (req, res) => {
    try {
        const count = await User.countDocuments();


        res.status(200).send({ userNumber: count });

    } catch (error) {

        res.status(500).send({ message: 'server error' });
    }
}

const updateUser = async (req, res) => {
    console.log("body",req.body);
    if(Object.keys(req.body).length === 0 ){
        return res.status(400).send({message: "Data to update is empty"});
    }

    const {id} = req.params;
    const options = {new: true, runValidators: true};

    await User.findByIdAndUpdate(id, req.body)
    .then(data => {
        !data? res.status(404).send({message: "User not found."}) : res.send({message: "Updated user", data});
    })
    .catch(() => {
        res.status(500).send({message: "Server error"});
    });
}


module.exports = {
    getUser,
    createUser,
    getNumberUser,
    updateUser,
}
