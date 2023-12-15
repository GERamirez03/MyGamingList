const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for covers */

class Cover {

    /** Create a cover with data provided */

    static async create({ id, game, url, height, width }) {

        const result = await db.query(`
            INSERT INTO covers
            (id, game_id, url, height, width)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, game_id, url, height, width`,
            [id, game, url, height, width]
        );
        const cover = result.rows[0];

        return cover;
    }

    /** Get a cover's information by game id */

    static async get(gameId) {

        const result = await db.query(`
            SELECT id, game_id, url, height, width
            FROM covers
            WHERE game_id = $1`,
            [gameId]
        );
        const cover = result.rows[0];

        if (!cover) throw new NotFoundError(`Game cover not found: ${gameId}`);

        return cover;
    }
}

module.exports = Cover;