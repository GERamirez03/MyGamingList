const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, UnauthorizedError, BadRequestError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");
const IGDBApi = require("../api");
const Game = require("../models/game");
const Cover = require("./cover");

/** Related functions for users. */

class User {

    /** Authenticate user with username, password */

    static async authenticate(username, password) {

        const result = await db.query(`
            SELECT id, username, password, email, is_admin
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const games = await User.getGames(user.id);
                delete user.password;
                user.games = games;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data provided */

    static async register({ username, password, email, is_admin }) {

        const duplicateCheck = await db.query(`
            SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        );
        const isDuplicate = duplicateCheck.rows[0];
        if (isDuplicate) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(`
            INSERT INTO users
            (username, password, email, is_admin)
            VALUES ($1, $2, $3, $4)
            RETURNING username, email, is_admin`,
            [username, hashedPassword, email, is_admin]
        );
        const user = result.rows[0];

        return user;
    }

    /** Get all users. */

    static async getAll() {
        const result = await db.query(`
            SELECT username, email, is_admin
            FROM users
            ORDER BY username`
        );
        return result.rows;
    }

    /** Get a user's account information by username. */

    static async getAccount(username) {
        const result = await db.query(`
            SELECT id, username, email, is_admin
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        if (!user) {
            throw new NotFoundError(`User not found: ${username}`);
        }

        return user;
    }

    /** Update user data with `data`. */

    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const { setCols, values } = sqlForPartialUpdate(data, {});
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `
            UPDATE users
            SET ${setCols}
            WHERE username = ${usernameVarIdx}
            RETURNING username, email
        `;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }

    /** Delete a user by username. */

    static async remove(username) {
        const result = await db.query(`
            DELETE FROM users
            WHERE username = $1
            RETURNING username`,
            [username]
        );
        const user = result.rows[0];

        if (!user) {
            throw new NotFoundError(`User not found: ${username}`);
        }
    }

    /** Add a game to the user's list */

    // Should this use users' serial ids? or username?
    // What difference does it make performance-wise?
    // Make these db calls in parallel?

    // i feel like this should use user id...

    static async addGameToList(username, gameId) {
        const userCheck = await db.query(`
            SELECT username, id
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userCheck.rows[0];

        if (!user) throw new NotFoundError(`User not found: ${username}`);

        const gameCheck = await db.query(`
            SELECT id
            FROM games
            WHERE id = $1`,
            [gameId]
        );
        const game = gameCheck.rows[0];

        /** If game/cover are not in local DB, fetch their data from API and add them */

        if (!game) {    
            let [gameData, coverData] = 
            await Promise.all([
                IGDBApi.getGameData(gameId),
                IGDBApi.getGameCover(gameId)
            ]);
            await Promise.all([
                Game.create(gameData),
                Cover.create(coverData)
            ]);
        }

        await db.query(`
            INSERT INTO users_games (user_id, game_id)
            VALUES ($1, $2)`,
            [user.id, gameId])
    }

    /** Remove a game from the user's list */

    // I feel like this should just accept user id and not username...

    static async removeGameFromList(username, gameId) {
        const userCheck = await db.query(`
            SELECT username, id
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userCheck.rows[0];

        if (!user) throw new NotFoundError(`User not found: ${username}`);

        const gameCheck = await db.query(`
            SELECT id
            FROM games
            WHERE id = $1`,
            [gameId]
        );
        const game = gameCheck.rows[0];

        if (!game) {
            throw new NotFoundError(`Game not found: ${gameId}`);
        }

        const deletion = await db.query(`
            DELETE FROM users_games
            WHERE user_id = $1 AND game_id = $2
            RETURNING user_id, game_id`,
            [user.id, gameId]
        );
        const result = deletion.rows[0];

        if (!result) {
            throw new NotFoundError(`Relationship not found: User ${user.id} with Game ${gameId}`);
        }
    }

    /** Get a user's profile information by username */

    static async getProfile(username) {
        const userCheck = await db.query(`
            SELECT username, id
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userCheck.rows[0];

        if (!user) throw new NotFoundError(`User not found: ${username}`);

        // we have a valid username/user.id => get their game list

        const userGamesRes = await db.query(`
            SELECT game_id
            FROM users_games
            WHERE user_id = $1`,
            [user.id]
        );
        const userGames = userGamesRes.rows.map(game => game.game_id);

        // this is an array of game ids... turn it into an array of game objects with id, name, and slug. array of promises, await all

        const games = await Promise.all(userGames.map(gameId => Game.get(gameId)));

        return { username, games };
    }

    static async getUserId(username) {
        const userCheck = await db.query(`
            SELECT username, id
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userCheck.rows[0];

        if (!user) throw new NotFoundError(`User not found: ${username}`);

        return user.id;
    }

    static async getGames(userId) {
        // we have a valid username/user.id => get their game list

        const userGamesRes = await db.query(`
            SELECT game_id
            FROM users_games
            WHERE user_id = $1`,
            [userId]
        );
        const userGames = userGamesRes.rows.map(game => game.game_id);

        // this is an array of game ids

        return userGames;
    }
}

module.exports = User;