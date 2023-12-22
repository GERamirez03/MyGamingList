import React from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardActions, CardContent, Button, Typography, Stack } from '@mui/material';

function CommentCard({ comment }) {
    console.debug(comment);
    const { id, author, review_id, text, created_at, updated_at, votes } = comment;
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
                {/** Voting */}
            </CardActions>
        </Card>
    );
}

export default CommentCard;