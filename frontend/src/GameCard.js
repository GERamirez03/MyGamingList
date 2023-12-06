import React from "react";
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

function GameCard({ game }) {

    const { id, name } = game;

    return (
        <Card>
            <CardContent>
                <Typography>
                    { id }
                </Typography>
                <Typography>
                    { name }
                </Typography>
            </CardContent>
            <CardActions>
                <Button>Details</Button>
            </CardActions>
        </Card>
    );
}

export default GameCard;