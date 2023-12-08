import React from "react";
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function GameCard({ game }) {

    const navigate = useNavigate();

    const { id, name, slug, checksum } = game;

    const toGameDetails = () => {
        navigate(`/games/${slug}`, { state: { gameId: id } });
    }

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
                <Button onClick={toGameDetails}>Details</Button>
            </CardActions>
        </Card>
    );
}

export default GameCard;