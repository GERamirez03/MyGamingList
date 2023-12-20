import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material"
import UserContext from "./userContext";

function ReviewViewer() {

    const { id } = useParams();
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

            {isAuthor
            ? <Button>Edit</Button>
            : <Button>Delete</Button>
            }
            {/** Comments TBD */}
        </Box>
    );
}

export default ReviewViewer;