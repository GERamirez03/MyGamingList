const express = require("express");

const router = new express.Router();

const db = require("../db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { BCRYPT_WORK_FACTOR, SECRET_KEY, JWT_OPTIONS } = require("../config");
const { ExpressError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const User = require("../models/user");

/** POST: Register user.
 *      {username, password, email} => {id, username, email}
 */

router.post("/register", async function (req, res, next) {
    try {
        const newUser = User.register({ ...req.body, is_admin: false });
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

        // let token = jwt.sign({ username, is_admin }, SECRET_KEY, JWT_OPTIONS);

        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

/** GET: Secret route for users with valid token */

router.get("/secret", ensureLoggedIn, async function (req, res, next) {
    try {
        // const token = req.body._token;
        // jwt.verify(token, SECRET_KEY);
        return res.json({ message: "Made it!" });
    } catch (err) {
        return next({ status: 401, message: "Unauthorized" });
    }
});

module.exports = router;