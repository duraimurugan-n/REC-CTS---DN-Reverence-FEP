const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const maxAge = 1 * 24 * 60 * 60* 60; // 60 day in seconds

// JWT Token Creation
function createToken(payload) {
    const token = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: maxAge }
    );

    return token;
}

//Comparing Password
async function comparePassword(pass, original) {
    const auth = await bcrypt.compare(pass, original);
    return auth;
}

//Checking Email
async function checkEmail(payload) {
    payload = jwt.verify(payload, process.env.SECRET);

    const auth = await bcrypt.compare(payload.email, payload.hash);
    return { auth: auth, email: payload.email };
}


module.exports = { maxAge, createToken, comparePassword, checkEmail };