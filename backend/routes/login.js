// auth.js to do the login process
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/login", async (req, res) => {
    // Validation of the user's existence
    const user = await User.findOne({ user: req.body.user });
    
    // 1. if the user doesn't exist
    if(!user) return res.status(400).send("User or password are incorrect");

    // 2. if the user exists, let's check the password. Hash will be a boolean
    const hash = await bcrypt.compare(req.body.password, user.password);

    // 2.1 if the password is wrong
    if (!hash) return res.status(400).send("User or password are incorrect");

    // 2.2 if the password is correct we send back token
    const jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
});

module.exports = router;