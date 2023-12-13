import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material"
import MyGamingListApi from "./api";
import UserContext from "./userContext";
import GameCard from "./GameCard";

function ProfileViewer() {

    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const apiHelper = useContext(UserContext);

    useEffect(function fetchProfileWhenMounted() {
        async function fetchProfile(username) {
            let profileRes = await apiHelper.getProfile(username);
            console.debug(profileRes);
            setProfile(profileRes);
            setIsLoading(false);
        }
        fetchProfile(username);
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1}}>
                { username }'s Profile
            </Typography>

            <Typography variant="h3" component="div" sx={{ flexGrow: 1}}>
                Games
            </Typography>

            {profile.games.map(game => <GameCard game={game} key={game.id} />)}

        </Box>
    );
}

export default ProfileViewer;