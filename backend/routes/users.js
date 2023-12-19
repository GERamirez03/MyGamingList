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
            const user = await User.getAccount(req.params.username);
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

/** POST a user adding a game to their list */

router.post("/:username/games/:id", 
    ensureLoggedIn, 
    ensureAdminOrTargetUser, 
    async function (req, res, next) {
        try {
            const gameId = +req.params.id;
            await User.addGameToList(req.params.username, gameId);
            return res.json({ result: { user: req.params.username, added: gameId }});
        } catch (err) {
            return next(err);
        }
});

/** PUT a user updating their rating of a game on their list */

router.put("/:username/games/:id",
    ensureLoggedIn,
    ensureAdminOrTargetUser,
    async function (req, res, next) {
        try {
            const gameId = +req.params.id;
            const rating = await User.updateUserGameRating(req.params.username, gameId, req.body.rating); // note that this route is expecting the user's new rating in req body !
            return res.json({ rating });
        } catch (err) {
            return next(err);
        }
});

/** DELETE a game from a user's list */

router.delete("/:username/games/:id",
    ensureLoggedIn,
    ensureAdminOrTargetUser,
    async function (req, res, next) {
        try {
            const gameId = +req.params.id;
            await User.removeGameFromList(req.params.username, gameId); // user id ?
            return res.json({ result: { user: req.params.username, removed: gameId }});
        } catch (err) {
            return next(err);
        }
});

/** GET profile of specified user */

router.get("/:username/profile",
    ensureLoggedIn,
    async function (req, res, next) {
        try {
            const user = await User.getProfile(req.params.username);
            return res.json({ user });
        } catch (err) {
            return next(err);
        }
    })

module.exports = router;