import React, { useState, useEffect, useContext } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import UserContext from "./userContext";
import { useDispatch } from "react-redux";
import { sendUserPostingCommentToApi } from "./actionCreators";


function CommentSection({ reviewId }) {

    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const apiHelper = useContext(UserContext);
    const dispatch = useDispatch();

    const postComment = commentFormData => {
        dispatch(sendUserPostingCommentToApi(commentFormData, apiHelper));
        setIsLoading(true);
    }

    useEffect(function fetchCommentsWhenMounted() {
        async function fetchComments(reviewId) {
            let commentsRes = await apiHelper.getComments(reviewId);
            console.debug(commentsRes);
            setComments(commentsRes);
            setIsLoading(false);
        }
        fetchComments(reviewId);
    }, [isLoading]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    const isEmpty = comments.length === 0;

    return (
        <Box>
            <CommentForm postComment={postComment} reviewId={reviewId} author={apiHelper.username} />
            {
                isEmpty
                ? <Typography variant="p">Be the first to comment!</Typography>
                : comments.map(comment => <CommentCard comment={comment} key={comment.id} />)
            }
        </Box>
    );
}

export default CommentSection;