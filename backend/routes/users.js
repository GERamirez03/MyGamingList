const express = require("express");

const router = new express.Router();

const db = require("../db");

const { ensureAdmin, ensureAdminOrTargetUser } = require("../middleware/auth");

/** GET users: [user, user, user] */

router.get("/all", ensureAdmin, async function(req, res, next) {
    try {
        const results = await db.query(`SELECT id, username, email FROM users`);
        return res.json(results.rows);
    }
    catch (err) {
        return next(err);
    }
});

/** GET information on specified user */

router.get("/:username", ensureAdminOrTargetUser, async function(req, res, next) {
    try {
        const results = await db.query(`SELECT id, username, email, is_admin FROM users WHERE username = $1`, [req.params.username]);
        return res.json(results.rows[0]);
    } catch (err) {
        return next(err);
    }
});

/** DELETE specified user account */

router.delete("/:username", ensureAdminOrTargetUser, async function(req, res, next) {
    try {
        const result = await db.query(`DELETE FROM users WHERE username = $1`, [req.params.username]);
        return res.json({ message: "Deleted" });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;