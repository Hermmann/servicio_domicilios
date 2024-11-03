const mongoose = require("mongoose");
const UserSchema = require('../models/user');

const createUser = async (req, res) => {

    if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Missing parameters like name, surname, email or password" });
    }
    try {
        const { name, surname, email, password } = req.body;
        const user = new UserSchema({ name, surname, email, password });
        
        await user.save().then(data => res.status(201).send(user))
            .catch(error => 
                /*11000 is E11000 o Error 11000.
                 An error code that appears 
                 when there is an attempt to enter an existing value or field, 
                In this case same email*/
                error.code === 11000? res.status(400).send({message: `¡${email} already exist!`})     :
                res.status(400).send({message: error.errors.email.message})
            );

    } catch (error) {
        
        console.error(error.code);
        res.status(500).json({ message: "Internal server error." });

    }
}

const getUser = async (req, res) => {
    const { id, email, password } = req.query;

    try {

        if (id) {

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid user ID format" });
            }

            const user = await UserSchema.findById(id, { _id: 0, email: 1, name: 1, surname: 1 });
            if (!user) {
                return res.status(404).json({ message: "The user doesn't exist" });
            }
            return res.status(200).json(user);


            // If no ID is provided, try with email and password
        } else if (email && password) {
            const user = await UserSchema.findOne({ email: email, password: password },
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
        const count = await UserSchema.countDocuments();


        res.status(200).send({ userNumber: count });

    } catch (error) {

        res.status(500).send({ message: 'server error' });
    }
}

const updateUser = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Data to update is empty" });
    }

    const { id } = req.params;
    const options = { new: true, runValidators: true };

    await UserSchema.findByIdAndUpdate(id, req.body)
        .then(data => {
            !data ? res.status(404).send({ message: "User not found." }) : res.send({ message: "Updated user", data });
        })
        .catch(() => {
            res.status(500).send({ message: "Server error" });
        });
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    await UserSchema.findByIdAndDelete(id).then(data => {
        !data ? res.status(404).send({ message: "User not found" }) : res.send({ message: "User deleted", data });
    }).catch(() => { res.status(500).send({ message: "Server error" }) });
}


module.exports = {
    getUser,
    createUser,
    getNumberUser,
    updateUser,
    deleteUser,
}
