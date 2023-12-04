const express = require("express");

const router = new express.Router();

const db = require("../db");

const { getTenGames } = require("../api");

/** GET ten games: [game, game, ...] */

router.get("/", async function(req, res, next) {
    try {
        console.log('YOU HAVE REACHED THE GAMES ENDPOINT OF MY API');
        await getTenGames();
        console.log("ON THE OTHER SIDE OF GET TEN GAMES!")
        return res.json({ message: "All done!" });
    }
    catch(err) {
        return next(err);
    }
});

module.exports = router;
