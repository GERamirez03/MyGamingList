import React, { useState, useEffect, useContext } from "react";
import UserContext from "./userContext";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import ReviewCard from "./ReviewCard";

function ReviewList() {

    const apiHelper = useContext(UserContext);

    const [reviewsArr, setReviewsArr] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function fetchReviewsWhenMounted() {
        async function fetchReviews() {
            let reviewsRes = await apiHelper.getReviews();
            console.debug(reviewsRes);
            setReviewsArr(reviewsRes);
            setIsLoading(false);
        }
        fetchReviews();
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1">
                Reviews
            </Typography>

            <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                {reviewsArr !== null && reviewsArr.map(review => <ReviewCard review={review} key={review.id} />)}
            </Stack>
        </Box>
    );
}

export default ReviewList;