import { REGISTER, LOGIN, LOGOUT } from "./actionTypes";
import MyGamingListApi from "./api";

// Action Creator for LOGOUT

export function logUserOut() {
    return {
        type: LOGOUT
    };
}

// Pair of functions which post a new user to the API

export function sendNewUserToApi(newUser) {
    return async function(dispatch) {
        let apiHelper = new MyGamingListApi();

        let { username, token } = await apiHelper.postNewUser(newUser); // postNewUser returns user = { username, token }

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

export function sendUserCredentialsToApi(userCredentials) {
    return async function(dispatch) {
        let apiHelper = new MyGamingListApi();

        let { username, token } = await apiHelper.postUserCredentials(userCredentials); // postNewUser returns user = { username, token }

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