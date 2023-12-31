const express = require("express");
const router = new express.Router({ mergeParams: true });

const { ensureLoggedIn } = require("../middleware/auth");
const Comment = require("../models/comment");

/** POST / 
 *  Post a new comment.
 * { author, review_id, text } => new Comment
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const comment = await Comment.create(req.body); // review_id in req.body
        return res.status(201).json({ comment });
    } catch (err) {
        return next(err);
    }
});

/** GET /[id]
 *  Get comments for a specific REVIEW.
 */

router.get("/:id", async function (req, res, next) {
    try {
        const comments = await Comment.getReviewComments(req.params.id);
        return res.status(200).json({ comments });
    } catch (err) {
        return next(err);
    }
});

/** PUT /[id]
 * Update a specific comment.
 */

router.put("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const comment = await Comment.update(req.params.id, req.body.text); // req.body contains text key with value of new comment text
        return res.json({ comment });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id]
 * Delete a specific comment
 */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const comment = await Comment.remove(req.params.id);
        return res.json({ removed: comment });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;