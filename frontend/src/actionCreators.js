import { REGISTER, LOGIN } from "./actionTypes";
import MyGamingListApi from "./api";

export function register() {
    return {
        type: REGISTER
    };
}

export function login() {
    return {
        type: LOGIN
    };
}

// Pair of functions which post a new user to the API

export function sendNewUserToApi(newUser) {
    return async function(dispatch) {
        let user = await MyGamingListApi.postNewUser(newUser); // user = { username, token }
        dispatch(sentNewUser(user));
    };
}

function sentNewUser(user) {
    return {
        type: REGISTER,
        user // user = { username, token }
    };
}

// Pair of functions which post a user's credentials to the API

export function sendUserCredentialsToApi(userCredentials) {
    return async function(dispatch) {
        let user = await MyGamingListApi.postUserCredentials(userCredentials); // user = { username, token }
        dispatch(sentUserCredentials(user));
    };
}

function sentUserCredentials(user) {
    return {
        type: LOGIN,
        user // user = { username, token }
    };
}