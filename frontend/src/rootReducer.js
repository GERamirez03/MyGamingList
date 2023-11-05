import { REGISTER, LOGIN } from "./actionTypes";

const INITIAL_STATE = {
    token: null
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGISTER:
            return { ...state };

        case LOGIN:
            return { ...state };

        default:
            return state;
    }
}

export default rootReducer;