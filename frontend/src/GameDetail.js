import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyGamingListApi from "./api";
import { Box, CircularProgress, Typography } from "@mui/material";

function GameDetail() {

    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState(null);

    const { slug } = useParams();

    /** Attempt to find that game, else redirect */
    // We're going to base the url's by either slugs from igdb itself so it should be fine...
    // eg '/games/super-mario-galaxy-2'

    /** While loading display loading... */

    /** Important Properties of Game Object 
     * 
     * id, name, slug, checksum (uuid hash of the object)
     * summary, first_release_date (unix time stamp!)
     * ** cover, platforms
     * 
     * ?* age_ratings
     * ?? aggregated_rating, aggregated_rating_count (Aggregated = comes from external critics, averaged by count)
     * ??? storyline
    */

    useEffect(function fetchGameDataWhenMounted() {
        async function fetchGameData(slug) {
            let apiHelper = new MyGamingListApi();
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
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                { name }
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                { first_release_date }
            </Typography>
            <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                { summary }
            </Typography>
        </Box>
    )

    // get specific game with "where id = 432432" or similar
}

export default GameDetail;