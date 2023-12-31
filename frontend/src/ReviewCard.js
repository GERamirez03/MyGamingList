import React from "react";
import { Card, CardActions, CardContent, CardHeader, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function ReviewCard({ review }) {

    const navigate = useNavigate();

    const { 
        id, 
        author, 
        title, 
        description, 
        created_at, 
    } = review;

    const toReviewDetails = () => {
        navigate(`/reviews/${id}`);
    }

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
            </CardContent>
            <CardActions>
                <Button size="small" onClick={toReviewDetails}>Read Review</Button>
            </CardActions>
        </Card>
    );
}

export default ReviewCard;