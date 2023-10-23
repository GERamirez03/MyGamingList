/** Express app for MyGamingList */

const express = require('express');

const { NotFoundError } = require("./expressError");

// const gameRoutes = require("./routes/games");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());

// app.use("/games", gameRoutes);
app.use("/users", userRoutes);

/** Handle 404 errors */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);

    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;