const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError } = require("../expressError");
const IGDBApi = require("../api");
const Cover = require("./cover");

/** Related functions for games. */

class Game {

    /** Create a game with data provided */

    static async create({ id, name, slug, summary, first_release_date, cover }) {

        // AT WHAT LAYER is a duplicate game being created an error?
        // If not intercepted, Postgres DB itself would throw an error
        // So I know I shouldn't let that happen.
        // But should it be an error in my Node backend?
        // How will that translate to the frontend? WILL it translate to the frontend?

        // const duplicateCheck = await db.query(`
        //     SELECT id
        //     FROM games
        //     WHERE id = $1`,
        //     [id]
        // );
        // const isDuplicate = duplicateCheck.rows[0];
        // // if (isDuplicate) return; // Duplicate game creation aborted; not an error.

        // if (isDuplicate) {
        //     throw new BadRequestError(`Duplicate game: (${id}) ${name}`);
        // }

        const result = await db.query(`
            INSERT INTO games
            (id, name, slug, summary, first_release_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name`,
            [id, name, slug, summary, first_release_date]
        );
        const game = result.rows[0];

        // // Create cover in local db
        // let coverData = await IGDBApi.getCoverData(cover);
        // await Cover.create(coverData);

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

        if (!game) {
            throw new NotFoundError(`Game not found: ${id}`);
        }

        return game;
    }
}

module.exports = Game;