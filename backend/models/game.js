const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for games. */

class Game {

    /** Create a game with data provided */

    static async create({ id, name, slug, summary, first_release_date }) {

        const result = await db.query(`
            INSERT INTO games
            (id, name, slug, summary, first_release_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name`,
            [id, name, slug, summary, first_release_date]
        );
        const game = result.rows[0];

        return game;
    }

    /** Get a game's information by id */

    static async get(id) {
        
        const result = await db.query(`
            SELECT id, name, slug, summary, first_release_date
            FROM games
            WHERE id = $1`,
            [id]
        );
        const game = result.rows[0];

        if (!game) throw new NotFoundError(`Game not found: ${id}`);

        return game;
    }
}

module.exports = Game;