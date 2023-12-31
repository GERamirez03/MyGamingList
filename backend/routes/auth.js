const express = require("express");
const router = new express.Router();

const { createToken } = require("../helpers/tokens");
const User = require("../models/user");

/** POST: Register user.
 *      {username, password, email} => {id, username, email}
 */

router.post("/register", async function (req, res, next) {
    try {
        const newUser = await User.register({ ...req.body, is_admin: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

/** POST: Login user. Returns JWT on success. */

router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token, games: user.games });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;