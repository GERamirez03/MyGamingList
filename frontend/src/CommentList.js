import React, { useState, useEffect, useContext } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import UserContext from "./userContext";
import { useDispatch } from "react-redux";
import { sendUserPostingCommentToApi } from "./actionCreators";


function CommentList({ comments }) {

    const isEmpty = comments.length === 0;

    return (
        <Box>
            {/** CommentList */}
            {
                isEmpty
                ? <Typography variant="p">Be the first to comment!</Typography>
                : comments.map(comment => <CommentCard comment={comment} key={comment.id} />)
            }
        </Box>
    );
}

export default CommentList;