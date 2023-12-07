import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Paper, Stack } from "@mui/material";
import UserContext from "./userContext";

function GameDetail() {

    const apiHelper = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState(null);

    const { slug } = useParams();

    /** Attempt to find that game, else redirect
     * We're going to base the url's by either slugs from igdb itself so it should be fine...
     * eg '/games/super-mario-galaxy-2'
     */

    /** Important Properties of Game Object 
     * 
     * id, name, slug, checksum (uuid hash of the object)
     * summary, first_release_date (unix time stamp!)
     * ** cover, platforms => **need separate api requests!
     * 
     * ?* age_ratings => ?not sure whether to include
     * ?? aggregated_rating, aggregated_rating_count (Aggregated = comes from external critics, averaged by count)
     * ??? storyline
    */

    useEffect(function fetchGameDataWhenMounted() {
        async function fetchGameData(slug) {
            let gameRes = await apiHelper.getGameData(slug);
            setGame(gameRes);
            setIsLoading(false);
        }
        fetchGameData(slug);
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    const { id, name, checksum, summary, first_release_date } = game;

    return (
        <Box sx={{ display: 'flex' }}>
            <Stack spacing={2}>
                <Paper>
                    <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                        { name }
                    </Typography>
                </Paper>
                <Paper>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                        { summary }
                    </Typography>
                </Paper>
                <Paper>
                    <Typography variant="i" component="div" sx={{ flexGrow: 1 }}>
                        { first_release_date }
                    </Typography>
                </Paper>
            </Stack>
        </Box>
    );
}

export default GameDetail;