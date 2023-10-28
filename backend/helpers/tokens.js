const jwt = require("jsonwebtoken");
const { SECRET_KEY, JWT_OPTIONS } = require("../config");

/** Create and return signed JWT from user data. */

function createToken(user) {
    let payload = {
        username: user.username,
        is_admin: user.is_admin || false
    };

    return jwt.sign(payload, SECRET_KEY, JWT_OPTIONS);
}

module.exports = { createToken };