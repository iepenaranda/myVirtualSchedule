// Reminder's CRUD
const express = require("express");
const router = express.Router();
const Reminder = require("../models/reminder");
const User = require("../models/user");
const Auth = require("../middleware/auth");

router.post("/newReminder", Auth, async (req, res) => {
    // checking the user who is doing the requirement
    const user = await User.findById(req.user._id);

    // 1. If the user doesn't exist
    if(!user) return res.status(400).send("Please login.")

    // 2. If the user exists we will stored the reminder
    const reminder = new Reminder({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
    });
    const result = await reminder.save();
    return res.status(200).send({result});
});

module.exports = router;