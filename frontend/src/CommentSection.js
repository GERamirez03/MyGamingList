import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import UserContext from "./userContext";
import { useDispatch } from "react-redux";
import { sendUserPostingCommentToApi } from "./actionCreators";


function CommentSection({ comments, reviewId }) {
    const isEmpty = comments.length === 0;

    const apiHelper = useContext(UserContext);
    const dispatch = useDispatch();

    const postComment = commentFormData => {
        dispatch(sendUserPostingCommentToApi(commentFormData, apiHelper));
    }

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