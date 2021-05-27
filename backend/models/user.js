// user will login in the app so we need to store its data (mongoose), and sent it in a secure way (jwt, moment)
// Modules import
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// User's schema definition that will be used in the DB
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    cellphone: String,
    user: String,
    password: String,
    date: { type: Date,
        default: Date.now},
});

// user's JWT method making
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            _id: this._id,
            user: this.user,
            email: this.email,
            iat: moment().unix(),
        },
        "mySecretKey"
    );
};

// Making of the user's collection in the DB
const User = mongoose.model("user", userSchema)

// module export
module.exports = User;