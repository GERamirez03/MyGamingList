import { REGISTER, LOGIN, LOGOUT, ADD_GAME, REMOVE_GAME, RATE_GAME, ADD_REVIEW, REMOVE_REVIEW, UPDATE_REVIEW, ADD_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT } from "./actionTypes";

// Action Creator for LOGOUT

export function logUserOut() {
    return {
        type: LOGOUT
    };
}

// Pair of functions which post a new user to the API

export function sendNewUserToApi(newUser, apiHelper) {
    return async function(dispatch) {
        let { username, token } = await apiHelper.postNewUser(newUser);
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

export function sendUserCredentialsToApi(userCredentials, apiHelper) {
    return async function(dispatch) {
        let { username, token, games, ratings, reviews, comments } = await apiHelper.postUserCredentials(userCredentials);
        dispatch(sentUserCredentials({ username, token, games, ratings, reviews, comments }));
    };
}

function sentUserCredentials({ username, token, games, ratings, reviews, comments }) {
    return {
        type: LOGIN,
        username,
        token,
        games, 
        ratings, 
        reviews, 
        comments
    };
}

// Pair of functions which post a user adding a game to their list to the API

export function sendUserAddingGameToApi(gameId, apiHelper) {
    return async function(dispatch) {
        let result = await apiHelper.addGameToList(gameId);
        console.debug(result);
        dispatch(sentUserAddingGame(result.added));
    }
}

function sentUserAddingGame(gameId) {
    return {
        type: ADD_GAME,
        gameId
    };
}

// Pair of functions which post a user removing a game from their list to the API

export function sendUserRemovingGameToApi(gameId, apiHelper) {
    return async function(dispatch) {
        let result = await apiHelper.removeGameFromList(gameId);
        console.debug(result);
        dispatch(sentUserRemovingGame(result.removed));
    }
}

function sentUserRemovingGame(gameId) {
    return {
        type: REMOVE_GAME,
        gameId
    }
}

// Pair of functions which post a user rating a game on their list to the API

export function sendUserRatingGameToApi(gameId, rating, apiHelper) {
    // apiHelper knows the username and token of user making this rating
    return async function(dispatch) {
        let result = await apiHelper.rateGame(gameId, rating);
        console.debug(result);
        dispatch(sentUserRatingGame(result.rating));
    };
}

function sentUserRatingGame(rating) {
    return {
        type: RATE_GAME,
        gameId: rating.game_id,
        rating: rating.rating
    };
}

// Pair of functions which post a new review to the API

export function sendNewReviewToApi(newReview, apiHelper) {
    return async function(dispatch) {
        let review = await apiHelper.postNewReview(newReview);
        console.debug(review);
        dispatch(sentNewReview(review));
    };
}

function sentNewReview(review) {
    return {
        type: ADD_REVIEW,
        reviewId: review.id,
        createdAt: review.created_at
    };
}

// Pair of functions which delete a review from the API

export function sendUserRemovingReviewToApi(reviewId, apiHelper) {
    return async function(dispatch) {
        let review = await apiHelper.removeReview(reviewId);
        console.debug(review);
        dispatch(sentUserRemovingReview(review));
    }
}

function sentUserRemovingReview(review) {
    return {
        type: REMOVE_REVIEW,
        reviewId: review.id
    };
}

// Pair of functions which send a user editing their review to the API

export function sendUserUpdatingReviewToApi(reviewId, data, apiHelper) {
    return async function(dispatch) {
        let review = await apiHelper.updateReview(reviewId, data);
        console.debug(review);
        dispatch(sentUserUpdatingReview(review));
    };
}

function sentUserUpdatingReview(review) {
    return {
        type: UPDATE_REVIEW,
        reviewId: review.id,
        updatedAt: review.updated_at
    };
}

// Pair of functions which send a user posting a new comment to the API

export function sendUserPostingCommentToApi(commentData, apiHelper) {
    return async function(dispatch) {
        let comment = await apiHelper.postNewComment(commentData);
        console.debug(comment);
        dispatch(sentUserPostingComment(comment));
    };
}

function sentUserPostingComment(comment) {
    return {
        type: ADD_COMMENT,
        commentId: comment.id,
        createdAt: comment.created_at
    };
}

// Pair of functions which send a user deleting a comment to the API

export function sendUserRemovingCommentToApi(commentId, apiHelper) {
    return async function(dispatch) {
        let comment = await apiHelper.removeComment(commentId);
        console.debug(comment);
        dispatch(sentUserRemovingComment(comment));
    }
}

function sentUserRemovingComment(comment) {
    return {
        type: REMOVE_COMMENT,
        commentId: comment.id
    };
}

// Pair of functions which send a user editing their comment to the API

export function sendUserUpdatingCommentToApi(commentId, data, apiHelper) {
    return async function(dispatch) {
        let comment = await apiHelper.updateComment(commentId, data);
        console.debug(comment);
        dispatch(sentUserUpdatingComment(comment));
    };
}

function sentUserUpdatingComment(comment) {
    return {
        type: UPDATE_COMMENT,
        commentId: comment.id,
        updatedAt: comment.updated_at
    };
}