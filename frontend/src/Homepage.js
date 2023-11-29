import React from "react";
import { Box, Typography } from "@mui/material"

function Homepage() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1}}>
                Welcome to MyGamingList!
            </Typography>
        </Box>
    );
}

export default Homepage;