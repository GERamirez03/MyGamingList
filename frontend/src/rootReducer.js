import { REGISTER, LOGIN, LOGOUT } from "./actionTypes";

const INITIAL_STATE = {
    username: null,
    token: null
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGISTER:
            let { username, token } = action.user;
            return { ...state, username, token };

        case LOGIN:
            let { username: user, token: tkn } = action.user;
            return { ...state, username: user, token: tkn };

        case LOGOUT: // Q: Should this just return INITIAL_STATE instead?
            return { ...state, username: null, token: null };

        default:
            return state;
    }
}

export default rootReducer;