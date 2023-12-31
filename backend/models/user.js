const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, UnauthorizedError, BadRequestError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");
const IGDBApi = require("../api");
const Game = require("../models/game");

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
                const { ratings, reviews, comments } = await User.getUserState(user.id, username);
                
                user.games = games;
                user.ratings = ratings;
                user.reviews = reviews;
                user.comments = comments;

                delete user.password;
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

    static async addGameToList(username, gameId) {

        /** Query db to check for user and game */

        const userRes = db.query(`
            SELECT username, id
            FROM users
            WHERE username = $1`,
            [username]
        );
        const gameRes = db.query(`
            SELECT id
            FROM games
            WHERE id = $1`,
            [gameId]
        );
        let [userCheck, gameCheck] = await Promise.all([userRes, gameRes]);

        /** If username not found in DB, throw NotFoundError */

        if (!userCheck.rows[0]) throw new NotFoundError(`User not found: ${username}`);
        
        /** If game is not in local DB, fetch game data from API and add it */

        if (!gameCheck.rows[0]) {
            let gameData = await IGDBApi.getGameData(gameId);
            await Game.create(gameData);
        }

        /** Finally, add the game to the user's list */

        await db.query(`
            INSERT INTO users_games (user_id, game_id)
            VALUES ($1, $2)`,
            [userCheck.rows[0].id, gameId])
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

    /** Update a user's rating of a game */

    static async updateUserGameRating(username, gameId, newRating) {

        /** Check for user */

        const userId = await User.getUserId(username);

        /** Query db to check for user_game relationship */

        const userGameRes = await db.query(`
            UPDATE users_games
            SET rating = $1
            WHERE user_id = $2
            AND game_id = $3
            RETURNING user_id, game_id, rating`,
            [newRating, userId, gameId]
        );
        const rating = userGameRes.rows[0];

        if (!rating) throw new NotFoundError(`User-Game not found: ${userId}-${gameId}`);

        const averageRating = await Game.updateRating(gameId);

        return { rating, averageRating };
    }

    /** Get a user's information to store in state */

    static async getUserState(userId, username) {

        const ratingsRes = db.query(`
            SELECT game_id, rating
            FROM users_games
            WHERE user_id = $1`,
            [userId]
        );

        const reviewsRes = db.query(`
            SELECT id, updated_at
            FROM reviews
            WHERE author = $1`,
            [username]
        );

        const commentsRes = db.query(`
            SELECT id, updated_at
            FROM comments
            WHERE author = $1`,
            [username]
        );

        const [ratings, reviews, comments] = await Promise.all([ratingsRes, reviewsRes, commentsRes]);

        return { 
            ratings: ratings.rows, 
            reviews: reviews.rows, 
            comments: comments.rows 
        };
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

        // we have a valid username/user.id => get the user's game list with ratings, game info, and review info as applicable

        const userProfileRes = await db.query(`
            SELECT 
                users_games.game_id, users_games.rating, 
                games.name, games.cover_url, games.slug, 
                reviews.id AS review_id, reviews.title, reviews.description
            FROM users
            JOIN users_games
                ON users.id = users_games.user_id
            JOIN games
                ON users_games.game_id = games.id
            JOIN reviews
                ON games.id = reviews.game_id
            WHERE username = $1`,
            [username]
        );

        /**

        // we have a valid username/user.id => get their game list with ratings

        const userGamesRes = await db.query(`
            SELECT game_id, rating
            FROM users_games
            WHERE user_id = $1`,
            [user.id]
        );
        const userGames = userGamesRes.rows.map(game => game.game_id);

        // this is an array of game ids... turn it into an array of game objects with id, name, and slug. array of promises, await all

        const games = await Promise.all(userGames.map(gameId => Game.get(gameId)));

        return { username, games };

        */

        return userProfileRes.rows;
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