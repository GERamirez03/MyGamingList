const express = require("express");

const router = new express.Router();

const db = require("../db");

/** GET users: [user, user, user] */

router.get("/all", async function(req, res, next) {
    try {
        const results = await db.query(`SELECT id, username, email FROM users`);
        return res.json(results.rows);
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;