const express = require("express");

const router = new express.Router();

const db = require("../db");

const { getTenGames, searchGames, getGameData, getGameDataById } = require("../api");

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
        const games = await searchGames(req.query.searchTerm);
        return res.status(200).json({ games });
    } catch(err) {
        return next(err);
    }
});

/** GET route for getting a specific game's data by slug */

router.get("/:slug", async function(req, res, next) {
    try {
        const game = await getGameData(req.params.slug);
        return res.status(200).json({ game });
    } catch(err) {
        return next(err);
    }
});

/** GET route for getting a specific game's data by id */

router.get("/search/:gameId", async function(req, res, next) {
    try {
        const game = await getGameDataById(req.params.gameId);
        return res.status(200).json({ game });
    } catch(err) {
        return next(err);
    }
});

module.exports = router;
