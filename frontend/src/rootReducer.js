import { REGISTER, LOGIN, LOGOUT, ADD_GAME, REMOVE_GAME, RATE_GAME, ADD_REVIEW, REMOVE_REVIEW, UPDATE_REVIEW, ADD_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT } from "./actionTypes";

const INITIAL_STATE = {
    username: null,
    token: null,
    games: [], // [gameId, ...]
    ratings: {}, // { [gameId]: rating, ... }
    reviews: {}, // { [reviewId]: updatedAt, ... }
    comments: {} // { [commentId]: updatedAt, ... }
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
            return { ...state, reviews: { ...state.reviews, [action.reviewId]: action.createdAt }};

        case REMOVE_REVIEW:
            // action.reviewId is the review we are attempting to remove
            const { [action.reviewId]: removedReview, ...remainingReviews } = state.reviews;
            return { ...state, reviews: remainingReviews };

        case UPDATE_REVIEW:
            return { ...state, reviews: { ...state.reviews, [action.reviewId]: action.updatedAt }};

        case ADD_COMMENT:
            return { ...state, comments: { ...state.comments, [action.commentId]: action.createdAt }};

        case REMOVE_COMMENT:
            // action.commentId is the comment we are attempting to remove
            const { [action.commentId]: removedComment, ... remainingComments } = state.comments;
            return { ...state, comments: remainingComments };

        case UPDATE_COMMENT:
            return { ...state, comments: { ...state.comments, [action.commentId]: action.updatedAt }};

        default:
            return state;
    }
}

export default rootReducer;