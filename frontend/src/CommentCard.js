import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Card, CardActions, CardContent, Button, Stack } from '@mui/material';
import UserContext from "./userContext";
import { sendUserRemovingCommentToApi } from "./actionCreators";
import { useDispatch } from "react-redux";


function CommentCard({ comment }) {

    const apiHelper = useContext(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeComment = () => {
        dispatch(sendUserRemovingCommentToApi(id, apiHelper));
        navigate("/reviews");
    }

    const editComment = () => {
        navigate("/comments/edit", { state: { commentData: comment }});
    }

    const toAuthorProfile = () => {
        navigate(`/users/${ author }`);
    }

    const { id, author, review_id, text, created_at, updated_at, votes } = comment;
    // console.debug(comment);

    const isAuthor = apiHelper.username === author;

    return (
        <Card>
            <CardContent>
                <Typography>
                    { text }
                </Typography>
                <Typography>
                    @{ author }
                </Typography>
                <Typography>
                    at { created_at }
                </Typography>
                <Typography>
                    updated { updated_at }
                </Typography>
                <Typography>
                    Votes: { votes }
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="text" onClick={toAuthorProfile}>@{ author }</Button>
                {/** Voting */}
                {
                    isAuthor &&
                    <>
                        <Button onClick={editComment}>Edit</Button>
                        <Button onClick={removeComment}>Delete</Button>
                    </>
                }
            </CardActions>
        </Card>
    );
}

export default CommentCard;