/** Express app for MyGamingList */

const express = require('express');
const cors = require('cors');
const morgan = require("morgan");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/games");
const reviewRoutes = require("./routes/reviews");
const commentRoutes = require("./routes/comments");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(authenticateJWT);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
app.use("/reviews", reviewRoutes);
app.use("/comments", commentRoutes);

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