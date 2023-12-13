import { REGISTER, LOGIN, LOGOUT, ADD_GAME, REMOVE_GAME } from "./actionTypes";

const INITIAL_STATE = {
    username: null,
    token: null,
    games: []
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGISTER:
            return { ...state, username: action.username, token: action.token };

        case LOGIN:
            return { ...state, username: action.username, token: action.token };

        case LOGOUT:
            return INITIAL_STATE;

        case ADD_GAME:
            return { ...state, games: [ ...state.games, action.gameId ]};

        case REMOVE_GAME:
            return { ...state, games: state.games.filter(gameId => gameId !== action.gameId) };

        default:
            return state;
    }
}

export default rootReducer;