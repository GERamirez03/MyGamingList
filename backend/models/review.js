const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for reviews. */

class Review {

    /** Create a review with data provided */

    static async create({ author, game_id, title, description, body }) {

        const result = await db.query(`
            INSERT INTO reviews
            (author, game_id, title, description, body)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, author, game_id`,
            [author, game_id, title, description, body]
        );
        const review = result.rows[0];

        return review;
    }

    /** Get a review's information by id */

    static async get(id) {

        const result = await db.query(`
            SELECT *
            FROM reviews
            WHERE id = $1`,
            [id]
        );
        const review = result.rows[0];

        if (!review) throw new NotFoundError(`Review not found: ${id}`);

        return review;
    }

    /** Get all reviews for a particular game by id */

    static async getGameReviews(gameId) {

        const result = await db.query(`
            SELECT *
            FROM reviews
            WHERE game_id = $1`,
            [gameId]
        );
        const reviews = result.rows // arr of Review obj's

        if (!reviews) throw new NotFoundError(`Reviews not found: ${gameId}`);

        return reviews;
    }

    /** Get all reviews sorted by created_at */

    static async getReviews() {

        const result = await db.query(`
            SELECT *
            FROM reviews
            ORDER BY created_at`
        );
        const reviews = result.rows;

        return reviews;
    }

    /** Update a review's data with `data`, which can include `title`, `body`, and/or `description` */

    static async update(id, data) {

        const { setCols, values } = sqlForPartialUpdate(data, {});
        const idIdx = "$" + (values.length + 1);

        const querySql = `
            UPDATE reviews
            SET ${setCols}
            WHERE id = ${idIdx}
            RETURNING id, author, game_id
        `;
        const result = await db.query(querySql, [...values, id]);
        const review = result.rows[0];

        if (!review) throw new NotFoundError(`Review not found: ${id}`);

        return review;
    }

    /** Update a review's votes with `delta` (+1 or -1) */

    static async vote(id, delta) {

        const result = await db.query(`
            UPDATE reviews
            SET votes = votes + $1
            WHERE id = $2
            RETURNING id, votes`,
            [delta, id]
        );
        const review = result.rows[0];

        if (!review) throw new NotFoundError(`Review not found: ${id}`);

        return review;
    }

    /** Delete a review by id */

    static async remove(id) {

        const result = db.query(`
            DELETE FROM reviews
            WHERE id = $1
            RETURNING id, author, game_id`,
            [id]
        );
        const review = result.rows[0];

        if (!review) throw new NotFoundError(`Review not found: ${id}`);

        return review;
    }
}

module.exports = Review;