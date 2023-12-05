const express = require("express");

const router = new express.Router();

const db = require("../db");

const { getTenGames } = require("../api");

/** GET ten games: [game, game, ...] */

router.get("/", async function(req, res, next) {
    try {
        const games = await getTenGames();
        return res.json({ games });
    }
    catch(err) {
        return next(err);
    }
});

module.exports = router;
