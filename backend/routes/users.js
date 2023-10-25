const express = require("express");

const router = new express.Router();

const db = require("../db");

const { ensureLoggedIn, ensureAdmin, ensureAdminOrTargetUser } = require("../middleware/auth");

/** GET all users: [user, user, user] */

router.get("/all", 
    ensureLoggedIn, 
    ensureAdmin, 
    async function(req, res, next) {
        try {
            const results = await db.query(`
                SELECT id, username, email 
                FROM users
            `);
            return res.json(results.rows);
        }
        catch (err) {
            return next(err);
        }
});

/** GET information on specified user */

router.get("/:username", 
    ensureLoggedIn, 
    ensureAdminOrTargetUser, 
    async function(req, res, next) {
        try {
            const result = await db.query(`
                SELECT id, username, email, is_admin 
                FROM users 
                WHERE username = $1`, 
                [req.params.username]
            );
            return res.json(result.rows[0]);
        } catch (err) {
            return next(err);
        }
});

/** DELETE specified user account */

router.delete("/:username", 
    ensureLoggedIn, 
    ensureAdminOrTargetUser, 
    async function(req, res, next) {
        try {
            const result = await db.query(`
                DELETE FROM users 
                WHERE username = $1`, 
                [req.params.username]
            );
            return res.json({ message: "Deleted" });
        } catch (err) {
            return next(err);
        }
});

module.exports = router;