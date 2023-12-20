import { REGISTER, LOGIN, LOGOUT, ADD_GAME, REMOVE_GAME, RATE_GAME, ADD_REVIEW, REMOVE_REVIEW } from "./actionTypes";

const INITIAL_STATE = {
    username: null,
    token: null,
    games: [],
    ratings: {},
    reviews: [] // arr or obj ?
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REGISTER:
            return { ...state, username: action.username, token: action.token };

        case LOGIN:
            return { ...state, username: action.username, token: action.token, games: action.games };

        case LOGOUT:
            return INITIAL_STATE;

        case ADD_GAME:
            return { ...state, games: [ ...state.games, action.gameId ]};

        case REMOVE_GAME:
            return { ...state, games: state.games.filter(gameId => gameId !== action.gameId) };

        case RATE_GAME:
            return { ...state, ratings: { ...state.ratings, [action.gameId]: action.rating }};

        case ADD_REVIEW:
            return { ...state, reviews: [ ...state.reviews, action.reviewId ]};

        case REMOVE_REVIEW:
            return { ...state, reviews: state.reviews.filter(reviewId => reviewId !== action.reviewId)};

        default:
            return state;
    }
}

export default rootReducer;