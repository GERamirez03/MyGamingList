import React from "react";
import { Box, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function CommentSection({ comments, reviewId }) {
    const isEmpty = comments.length === 0;
    return (
        <Box>
            <CommentForm reviewId={reviewId} />
            {
                isEmpty
                ? <Typography variant="p">Be the first to comment!</Typography>
                : comments.map(comment => <CommentCard comment={comment} key={comment.id} />)
            }
        </Box>
    );
}

export default CommentSection;