const express = require("express");

const router = new express.Router();

const db = require("../db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { BCRYPT_WORK_FACTOR, SECRET_KEY, JWT_OPTIONS } = require("../config");
const { ExpressError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");

/** POST: Register user.
 *      {username, password, email} => {id, username, email}
 */

router.post("/register", async function (req, res, next) {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const result = await db.query(`
            INSERT INTO users (username, password, email)
                VALUES ($1, $2, $3)
                RETURNING id, username, email`,
            [username, hashedPassword, email]);

        return res.json(result.rows[0]);
    } catch (err) {
        return next(err);
    }
});

/** POST: Login user. Returns JWT on success. */

router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const result = await db.query(`
            SELECT password FROM users WHERE username = $1`,
            [username]);
        const user = result.rows[0];

        if (user) {
            if (await bcrypt.compare(password, user.password) === true) {
                let token = jwt.sign({ username }, SECRET_KEY, JWT_OPTIONS);
                return res.json({ token });
            }
        }
        throw new ExpressError("Invalid username/password", 400);
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