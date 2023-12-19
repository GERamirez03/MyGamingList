const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for comments. */

class Comment {

    /** Create a comment with data provided */

    static async create({ author, review_id, text }) {

        const result = await db.query(`
            INSERT INTO comments
            (author, review_id, text)
            VALUES ($1, $2, $3)
            RETURNING id, author, review_id, text, created_at`,
            [author, review_id, text]
        );
        const comment = result.rows[0];

        return comment;
    }

    /** Get a comment's information by id */

    static async get(id) {

        const result = await db.query(`
            SELECT * 
            FROM comments 
            WHERE id = $1`, 
            [id]
        );
        const comment = result.rows[0];

        if (!comment) throw new NotFoundError(`Comment not found: ${id}`);

        return comment;
    }

    /** Get all comments for a particular review by id */

    static async getReviewComments(reviewId) {

        const result = await db.query(`
            SELECT * 
            FROM comments 
            WHERE review_id = $1`, 
            [reviewId]
        );
        const comments = result.rows; // arr of Comment obj's

        if (!comments) throw new NotFoundError(`Comments not found: ${reviewId}`);

        return comments;
    }

    /** Update a comment's text with `text` */

    static async update(id, text) {

        const result = await db.query(`
            UPDATE comments
            SET text = $1
            WHERE id = $2
            RETURNING id, author, text`,
            [text, id]
        );
        const comment = result.rows[0];

        if (!comment) throw new NotFoundError(`Comment not found: ${id}`);

        return comment;
    }

    /** Update a comment's votes with `delta` (+1 or -1) */

    static async vote(id, delta) {

        const result = await db.query(`
            UPDATE comments
            SET votes = votes + $1
            WHERE id = $2
            RETURNING id, votes`,
            [delta, id]
        );
        const comment = result.rows[0];

        if (!comment) throw new NotFoundError(`Comment not found: ${id}`);

        return comment;
    }

    static async remove(id) {

        const result = db.query(`
            DELETE FROM comments
            WHERE id = $1
            RETURNING id`,
            [id]
        );
        const comment = result.rows[0];

        if (!comment) throw new NotFoundError(`Comment not found: ${id}`);

        return comment;
    }
}

module.exports = Comment;