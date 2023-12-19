const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for games. */

class Game {

    /** Create a game with data provided */

    static async create({ id, name, slug, summary, first_release_date, cover, platforms }) {

        const result = await db.query(`
            INSERT INTO games
            (id, name, slug, summary, first_release_date, cover_url, platforms)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, name`,
            [id, name, slug, summary, first_release_date, cover.url, platforms.map(platform => platform.name).join(', ')]
        );
        const game = result.rows[0];

        return game;
    }

    /** Get a game's information by id */

    static async get(id) {
        
        const result = await db.query(`
            SELECT id, name, slug, summary, first_release_date, cover_url
            FROM games
            WHERE id = $1`,
            [id]
        );
        const game = result.rows[0];

        if (!game) throw new NotFoundError(`Game not found: ${id}`);

        return game;
    }

    /** Update a game's average rating */

    static async updateRating(id) {

        const result = await db.query(`
            SELECT rating
            FROM users_games
            WHERE game_id = $1`,
            [id]
        );
        let sum = 0;
        result.rows.map(row => sum += row.rating);
        let avg = sum / result.rows.length;

        const avgRes = await db.query(`
            UPDATE ratings
            SET rating = $1
            WHERE game_id = $2
            RETURNING game_id, rating`,
            [avg, id]
        );
        return avgRes.rows[0]; // { gameId, rating }
    }
}

module.exports = Game;