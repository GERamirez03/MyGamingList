const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** Related functions for users. */

class User {
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
}

module.exports = User;