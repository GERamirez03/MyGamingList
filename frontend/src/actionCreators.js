import { REGISTER, LOGIN, LOGOUT, ADD_GAME, REMOVE_GAME } from "./actionTypes";
import MyGamingListApi from "./api";

// Action Creator for LOGOUT

export function logUserOut() {
    return {
        type: LOGOUT
    };
}

// Pair of functions which post a new user to the API

export function sendNewUserToApi(newUser, apiHelper) {
    return async function(dispatch) {
        let { username, token } = await apiHelper.postNewUser(newUser);
        dispatch(sentNewUser({ username, token }));
    };
}

function sentNewUser({ username, token }) {
    return {
        type: REGISTER,
        username,
        token
    };
}

// Pair of functions which post a user's credentials to the API

export function sendUserCredentialsToApi(userCredentials, apiHelper) {
    return async function(dispatch) {
        let { username, token } = await apiHelper.postUserCredentials(userCredentials);
        dispatch(sentUserCredentials({ username, token }));
    };
}

function sentUserCredentials({ username, token }) {
    return {
        type: LOGIN,
        username,
        token
    };
}

// Pair of functions which post a user adding a game to their list to the API

export function sendUserAddingGameToApi(gameId, apiHelper) {
    return async function(dispatch) {
        let result = await apiHelper.addGameToList(gameId);
        console.debug(result);
        dispatch(sentUserAddingGame(result.added));
    }
}

function sentUserAddingGame(gameId) {
    return {
        type: ADD_GAME,
        gameId
    };
}

// Pair of functions which post a user removing a game from their list to the API

export function sendUserRemovingGameToApi(gameId, apiHelper) {
    return async function(dispatch) {
        let result = await apiHelper.removeGameFromList(gameId);
        console.debug(result);
        dispatch(sentUserRemovingGame(result.removed));
    }
}

function sentUserRemovingGame(gameId) {
    return {
        type: REMOVE_GAME,
        gameId
    }
}