import { REGISTER, LOGIN, LOGOUT } from "./actionTypes";

const INITIAL_STATE = {
    username: null,
    token: null
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGISTER:
            return { ...state, username: action.username, token: action.token };

        case LOGIN:
            return { ...state, username: action.username, token: action.token };

        case LOGOUT:
            return INITIAL_STATE;

        default:
            return state;
    }
}

export default rootReducer;