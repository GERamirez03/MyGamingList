const express = require("express");

const router = new express.Router();

const db = require("../db");

const { getTenGames, searchGames, getGameData, getGameDataById } = require("../api");

const Game = require("../models/game");

/** GET ten games: [game, game, ...] */

router.get("/", async function(req, res, next) {
    try {
        const games = await getTenGames();
        return res.status(200).json({ games });
    } catch(err) {
        return next(err);
    }
});

/** POST route for searching games */

router.post("/search", async function(req, res, next) {
    try {
        const games = await searchGames(req.body.searchTerm);
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
