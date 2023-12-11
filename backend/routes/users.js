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

/** POST a user adding a game to their list */

/** Outline
 * Backend receives request that user :username
 * would like to add game :id
 * to their list.
 * 
 * Backend needs to check if user :username
 * exists in local db.
 * 
 * => If so, proceed.
 * => If not, error out of the bad request.
 * 
 * Backend needs to check if we already have
 * game :id in the local db.
 * 
 * => If so, proceed.
 * => If not, add game to local db.
 * 
 * Finally, add the user and game info
 * to a new row in users_games.
 */

router.post("/:username/games/:id", 
    ensureLoggedIn, 
    ensureAdminOrTargetUser, 
    async function (req, res, next) {
        try {
            const gameId = +req.params.id;
            await User.addGameToList(req.params.username, gameId); // Should frontend keep track of user's id for db purposes?
            return res.json({ result: { user: req.params.username, added: gameId }});
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

module.exports = router;