const express = require("express");
const router = new express.Router({ mergeParams: true });

const { ensureLoggedIn } = require("../middleware/auth");
const Comment = require("../models/comment");

// NOTE THAT REVIEW_ID WILL BE IN REQ PARAMS! mergeParams

/** POST / 
 *  Post a new comment.
 * { author, review_id, text } => new Comment
 */

router.post("/", async function (req, res, next) {
    try {
        const comment = await Comment.create(req.body); // note that review_id in body!
        return res.status(201).json({ comment });
    } catch (err) {
        return next(err);
    }
});

/** GET /
 *  Get comments for a specific review.
 */

router.get("/", async function (req, res, next) {
    try {
        const comments = await Comment.getReviewComments(req.params.review_id);
        return res.status(200).json({ comments });
    } catch (err) {
        return next(err);
    }
});

/** PUT /[id]
 * Update a specific comment.
 */

router.put("/:id", async function (req, res, next) {
    try {
        const comment = await Comment.update(req.params.id, req.body.text); // note this looks for text key in body of req to have new comment text!
        return res.json({ comment });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id]/vote/(up|down)
 * Update an up- or down-vote on a comment
 */

router.patch("/:id/vote/:direction", async function (req, res, next) {
    try {
        const delta = req.params.direction === "up" ? +1 : -1;
        const comment = await Comment.vote(req.params.id, delta);
        return res.json({ comment });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id]
 * Delete a specific comment
 */

router.delete("/:id", async function (req, res, next) {
    try {
        const comment = await Comment.remove(req.params.id);
        return res.json({ removed: comment });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;