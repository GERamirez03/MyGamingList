import { REGISTER, LOGIN } from "./actionTypes";

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
            return { ...state };

        default:
            return state;
    }
}

export default rootReducer;