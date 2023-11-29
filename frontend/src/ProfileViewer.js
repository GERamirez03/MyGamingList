import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material"
import MyGamingListApi from "./api";

function ProfileViewer() {

    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(function fetchProfileWhenMounted() {
        async function fetchProfile() {
            // TODO: User ACCOUNT (private) vs PROFILE (public) data
            // let profileData = await MyGamingListApi.getUserProfile(username);
            let profileData = { username: "testingzzz"};
            console.log(profileData);
            setUser(profileData);
        }
        fetchProfile();
    }, []);

    if (user === null) return <Typography>Loading...</Typography>

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1}}>
                { username }'s Profile
            </Typography>

            <Typography variant="h3" component="div" sx={{ flexGrow: 1}}>
                Games
            </Typography>

        </Box>
    );
}

export default ProfileViewer;