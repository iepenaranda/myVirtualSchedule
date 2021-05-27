// user's CRUD, (express, bcrypt, Userschema)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Creation of the users
router.post("/newUser", async (req, res) => {
    // Validation of the user's existence
    let user = await User.findOne({ user: req.body.user });

    // 1. If the user exits
    if (user) return res.status(400).send("The user already exists.");

    // 2. If the user doesn't exists
    // 2.1 encript of the user's password
    const hash = await bcrypt.hash(req.body.password, 9);

    // 2.2 creation of an instance of user
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        cellphone: req.body.cellphone,
        user: req.body.user,
        password: hash,
    });

    // 2.3 store of the user
    // .save() is promise, that's why we use an await !
    const result = await user.save();
    if (result) {
        // if the user is saved correctly
        const jwtToken = user.generateJWT();
        res.status(200).send({ jwtToken })
    } else {
        return res.status(400).send("The user couldn't be registered.");
    }
});

// route export
module.exports = router;