const express = require("express");
const router = new express.Router();

const { ensureLoggedIn } = require("../middleware/auth");
const Review = require("../models/review");
const Comment = require("../models/comment");

// have game_id params? mergeParams?

/** POST / 
 *  Post a new review.
 * {author, game_id, title, description, body} => new Review
 */

router.post("/", async function (req, res, next) {
    try {
        const review = await Review.create(req.body);
        return res.status(201).json({ review });
    } catch (err) {
        return next(err);
    }
});

/** GET /[id]
 *  Get details of a specific review
 */

router.get("/:id", async function (req, res, next) {
    try {
        const [review, comments] = await Promise.all([Review.get(req.params.id), Comment.getReviewComments(req.params.id)]);
        return res.json({ review, comments });
    } catch (err) {
        return next(err);
    }
});

/** GET /
 *  Get all reviews, sorted by most recent created_at ??
 */

router.get("/", async function (req, res, next) {
    try {
        const reviews = await Review.getReviews();
        return res.status(200).json({ reviews });
    } catch (err) {
        return next(err);
    }
});

/** GET /
 *  Get reviews for a specific game
 */

router.get("/", async function (req, res, next) {
    try {
        const reviews = await Review.getGameReviews(req.params.game_id);
        return res.status(200).json({ reviews });
    } catch (err) {
        return next(err);
    }
});

/** PUT /[id]
 *  Update given fields of a specific review
 */

router.put("/:id", async function (req, res, next) {
    try {
        const review = await Review.update(req.params.id, req.body);
        return res.json({ review });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id]/vote/(up|down)
 *  Update an up- or down-vote on a review
 */

router.patch("/:id/vote/:direction", async function (req, res, next) {
    try {
        const delta = req.params.direction === "up" ? +1 : -1;
        const review = await Review.vote(req.params.id, delta);
        return res.json({ review });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id]
 *  Delete a specific review
 */

router.delete("/:id", async function (req, res, next) {
    try {
        const review = await Review.remove(req.params.id);
        return res.json({ removed: review });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;