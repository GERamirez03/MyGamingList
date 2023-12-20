import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material"
import UserContext from "./userContext";
import { useDispatch } from "react-redux";
import { sendUserRemovingReviewToApi } from "./actionCreators";

function ReviewViewer() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [review, setReview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const apiHelper = useContext(UserContext);

    useEffect(function fetchReviewWhenMounted() {
        async function fetchReview(id) {
            let reviewRes = await apiHelper.getReview(id);
            console.debug(reviewRes);
            setReview(reviewRes);
            setIsLoading(false);
        }
        fetchReview(id);
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    const removeReview = () => {
        dispatch(sendUserRemovingReviewToApi(id, apiHelper));
        navigate("/reviews");
    }

    const editReview = () => {
        navigate("/reviews/edit", { state: { reviewData: review }});
    }

    const { author, game_id, title, description, body, created_at, updated_at, votes } = review;
    const isAuthor = apiHelper.username === author;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1">
                { title }
            </Typography>
            <Typography variant="h3">
                { description }
            </Typography>
            <Typography variant="h5">
                By { author }
            </Typography>
            <Typography variant="h5">
                Votes: { votes }
            </Typography>
            <Typography variant="p">
                { body }
                <br />
            </Typography>
            <Typography variant="p">
                Created at: { created_at }
                <br/>
                Updated at: { updated_at }
                <br/>
                Game ID: { game_id }
            </Typography>

            {isAuthor &&
            <>
                <Button onClick={editReview}>Edit</Button>
                <Button onClick={removeReview}>Delete</Button>
            </>
            }
            {/** Comments TBD */}
        </Box>
    );
}

export default ReviewViewer;