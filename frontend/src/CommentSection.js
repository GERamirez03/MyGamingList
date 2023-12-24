import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import UserContext from "./userContext";
import CommentList from "./CommentList";


function CommentSection({ reviewId }) {

    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const apiHelper = useContext(UserContext);
    const navigate = useNavigate();

    const writeComment = () => {
        navigate("/comments/new", { state: { reviewId }});
    }

    useEffect(function fetchCommentsWhenMounted() {
        async function fetchComments(reviewId) {
            let commentsRes = await apiHelper.getComments(reviewId);
            console.debug(commentsRes);
            setComments(commentsRes);
            setIsLoading(false);
        }
        fetchComments(reviewId);
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Button onClick={writeComment}>Write a Comment</Button>
            <CommentList comments={comments} />
        </Box>
    );
}

export default CommentSection;