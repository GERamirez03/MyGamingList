const express = require("express");

const router = new express.Router();

const db = require("../db");

const { ensureLoggedIn, ensureAdmin, ensureAdminOrTargetUser } = require("../middleware/auth");
const User = require("../models/user");

/** GET all users: [user, user, user] */

router.get("/", 
    ensureLoggedIn, 
    ensureAdmin, 
    async function(req, res, next) {
        try {
            const users = await User.getAll();
            return res.json({ users });
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
            const user = await User.get(req.params.username);
            return res.json({ user });
        } catch (err) {
            return next(err);
        }
});

/** PATCH specific fields for given user */

router.patch("/:username",
    ensureLoggedIn,
    ensureAdminOrTargetUser,
    async function(req, res, next) {
        try {
            const user = await User.update(req.params.username, req.body);
            return res.json({ user });
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
            await User.remove(req.params.username);
            return res.json({ deleted: req.params.username });
        } catch (err) {
            return next(err);
        }
});

module.exports = router;