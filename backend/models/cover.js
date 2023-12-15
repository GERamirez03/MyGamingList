const db = require("../db");

/** Related functions for covers */

class Cover {

    /** Create a cover with data provided */

    static async create({ id, game, url, height, width }) {

        // check duplicate ?

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
}

module.exports = Cover;