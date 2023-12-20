import React from "react";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";

function ReviewCard({ review }) {

    const navigate = useNavigate();

    const { 
        id, 
        author, 
        game_id, 
        title, 
        description, 
        body, 
        created_at, 
        updated_at, 
        votes 
    } = review;

    const toReviewDetails = () => {
        navigate(`/reviews/${id}`);
    }

    // ? game*

    return (
        <Card>
            <CardHeader
                title={title}
                subheader={created_at}
             />
            <CardContent>
                <Typography variant="body1" color="text.primary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    By {author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Votes: {votes}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={toReviewDetails}>Read Review</Button>
            </CardActions>
        </Card>
    );
}

export default ReviewCard;