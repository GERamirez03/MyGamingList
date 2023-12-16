import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function GameCard({ game }) {

    const navigate = useNavigate();

    const { id, name, slug, checksum, cover } = game;

    const toGameDetails = () => {
        navigate(`/games/${slug}`, { state: { gameId: id } });
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height={cover.height}
                width={cover.width}
                image={cover.url}
                alt={`Cover for ${ name }`} />
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