const express = require("express");
const router = new express.Router();

const IGDBApi = require("../api");
const Game = require("../models/game");

/** POST route for searching games */

router.post("/search", async function(req, res, next) {
    try {
        const games = await IGDBApi.searchGames(req.body.searchTerm);
        return res.status(200).json({ games });
    } catch(err) {
        return next(err);
    }
});

/** GET route for getting a specific game's data by id */

router.get("/:gameId", async function(req, res, next) {
    try {
        const game = await IGDBApi.getGameData(req.params.gameId);
        return res.status(200).json({ game });
    } catch(err) {
        return next(err);
    }
});

/** POST route for creating a game in local DB */

router.post("/create", async function (req, res, next) {
    try {
        const newGame = await Game.create(req.body); // (needs quality control) for now, expect necessary game data in body of request
        return res.status(201).json({ created: newGame });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
