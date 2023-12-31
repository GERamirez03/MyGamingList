import React, { useContext } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, Rating } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendUserRemovingReviewToApi } from "./actionCreators";
import UserContext from "./userContext";

function ProfileCard({ data, isAuthor }) {

    const {
        cover_url,
        description,
        game_id,
        name,
        rating,
        review_id,
        slug,
        title
    } 
    = data;

    const hasCover = Boolean(cover_url);
    const hasRating = Boolean(rating);
    const hasReview = Boolean(review_id);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiHelper = useContext(UserContext);

    const toGameDetails = () => {
        navigate(`/games/${slug}`, { state: { gameId: game_id } });
    }

    const toReviewDetails = () => {
        navigate(`/reviews/${review_id}`);
    }

    const editReview = () => {
        navigate("/reviews/edit", { state: { reviewData: { game_id, description, review_id, title }}});
    }

    const removeReview = () => {
        dispatch(sendUserRemovingReviewToApi(review_id, apiHelper));
        navigate("/reviews");
    }

    return (
        <Card>
            <Stack direction="row" spacing={2}>
                {/** Render cover image; handle no cover url */}
                {
                hasCover 
                ?   <CardMedia
                        component="img"
                        image={cover_url}
                        alt={`Cover for ${ name }`}
                        sx={{
                            width: 100,
                            height: 100
                        }} />
                :   <ImageNotSupportedIcon fontSize="large"/>
                }
                
                {/** Render data */}
                <CardContent>
                    <Stack direction="column" spacing={1}>
                        <Typography>
                            { name }
                        </Typography>
                        {hasReview &&
                            <>
                                <Typography>
                                    { title }
                                </Typography>
                                <Typography>
                                    { description }
                                </Typography>
                            </>
                        }                                        
                        <Rating value={hasRating ? rating : null} readOnly />
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button onClick={toGameDetails}>Game Details</Button>
                    {hasReview &&
                        <Button onClick={toReviewDetails}>Read Review</Button>
                    }
                    
                    {/** If author, edit/delete buttons for reviews */}
                    {isAuthor &&
                        <>
                            <Button onClick={editReview}>Edit Review</Button>
                            <Button onClick={removeReview}>Delete Review</Button>
                        </>
                    }
                </CardActions>
            </Stack>
        </Card>
    );
}

export default ProfileCard;