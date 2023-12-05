const express = require("express");

const router = new express.Router();

const db = require("../db");

const { getTenGames, searchGames } = require("../api");

/** GET ten games: [game, game, ...] */

router.get("/", async function(req, res, next) {
    try {
        const games = await getTenGames();
        return res.status(200).json({ games });
    } catch(err) {
        return next(err);
    }
});

/** GET route for searching games */

router.get("/search", async function(req, res, next) {
    try {
        const games = await searchGames(req.body.searchTerm);
        return res.status(200).json({ games });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
