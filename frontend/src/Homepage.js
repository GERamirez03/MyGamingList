import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material"

function Homepage() {

    const username = useSelector(store => store.username);
    const token = useSelector(store => store.token);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1}}>
                Welcome to MyGamingList!
            </Typography>
        {
            username && token &&
            <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                Signed in as: { username }
                With token: { token }
            </Typography>
        }
        </Box>
    );
}

export default Homepage;