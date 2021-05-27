// this middleware will check the user's session
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // checking the header looking for the Authorization block
    let jwtToken = req.header("Authorization");
    // checking for the JWT
    // 1. if the token doesn't exist
    if (!jwtToken) return res.status(400).send("Denied: Token doesn't exist");

    // 2. if the token exist, we will get the JWT
    jwtToken = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(400).send("Denied: Token doesn't exist");

    // 2.1 Looking for the JWT's payload
    try {
        const payload = jwt.verify(jwtToken, "mySecretKey")
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send("Denied: Token is invalid")
    }
};

module.exports = auth;