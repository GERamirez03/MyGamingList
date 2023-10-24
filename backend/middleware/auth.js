const express = require("express");

const jwt = require("jsonwebtoken");

const { BCRYPT_WORK_FACTOR, SECRET_KEY, JWT_OPTIONS } = require("../config");
const { ExpressError } = require("../expressError");

/** Authenticate JWT and add authenticated user to request if applicable. */

function authenticateJWT(req, res, next) {
    try {
        const token = req.body._token;
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        return next();
    } catch (err) {
        return next();
    }
}

/** Require user or raise 401 Error. */

function ensureLoggedIn(req, res, next) {
    if (!req.user) {
        const err = new ExpressError("Unauthorized", 401);
        return next(err);
    } else {
        return next();
    }
}

module.exports = { authenticateJWT, ensureLoggedIn };