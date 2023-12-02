const express = require("express");

const jwt = require("jsonwebtoken");

const { BCRYPT_WORK_FACTOR, SECRET_KEY, JWT_OPTIONS } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Authenticate JWT and add authenticated user to request if applicable. */

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
}

/** Require user or raise 401 Error. */

function ensureLoggedIn(req, res, next) {
    if (!res.locals.user) {
        const err = new UnauthorizedError();
        return next(err);
    } else {
        return next();
    }
}

/** Require admin user or raise 401 Error. */

function ensureAdmin(req, res, next) {
    if (!res.locals.user.is_admin) {
        const err = new UnauthorizedError();
        return next(err);
    } else {
        return next();
    }
}

/** Require admin or target user else raise 401 Error. */

function ensureAdminOrTargetUser(req, res, next) {
    if (!res.locals.user.is_admin && (req.params.username !== res.locals.user.username)) {
        const err = new UnauthorizedError();
        return next(err);
    } else {
        return next();
    }
}

module.exports = { 
    authenticateJWT, 
    ensureLoggedIn, 
    ensureAdmin, 
    ensureAdminOrTargetUser 
};