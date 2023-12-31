import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { useNavigate } from "react-router-dom";

function GameCard({ game, url }) {

    const navigate = useNavigate();

    const { id, name, slug } = game;

    const toGameDetails = () => {
        navigate(`/games/${slug}`, { state: { gameId: id } });
    }

    return (
        <Card>
            <Stack direction="row" spacing={2}>

                {url
                ? <CardMedia
                    component="img"
                    image={url}
                    alt={`Cover for ${ name }`}
                    sx={{
                        width: 100,
                        height: 100
                    }}
                  />
                : <ImageNotSupportedIcon fontSize="large" />
                }
                
                <CardContent>
                    <Typography>
                        { name }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={toGameDetails}>Details</Button>
                </CardActions>
            </Stack>
        </Card>
    );
}

export default GameCard;