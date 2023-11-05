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
    }
}