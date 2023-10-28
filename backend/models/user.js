const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, UnauthorizedError, BadRequestError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** Related functions for users. */

class User {

    /** Authenticate user with username, password */

    static async authenticate(username, password) {

        const result = await db.query(`
            SELECT username, password, email, is_admin
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
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
        const result = db.query(`
            SELECT username, email, is_admin
            FROM users
            ORDER BY username`
        );
        return result.rows;
    }

    /** Get a user's information by username. */

    static async get(username) {
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
}

module.exports = User;