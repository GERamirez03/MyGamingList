const express = require("express");

const router = new express.Router();

const db = require("../db");

const bcrypt = require("bcrypt");

const { BCRYPT_WORK_FACTOR } = require("../config");
const { ExpressError } = require("../expressError");

/** Register user.
 *      {username, password, email} => {username}
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

/** Login user.
 *      {username, password} => {message} on success
 */

router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const result = await db.query(`
            SELECT password FROM users WHERE username = $1`,
            [username]);
        const user = result.rows[0];

        if (user) {
            if (await bcrypt.compare(password, user.password) === true) {
                return res.json({ message: "Logged in!" });
            }
        }
        throw new ExpressError("Invalid username/password", 400);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;