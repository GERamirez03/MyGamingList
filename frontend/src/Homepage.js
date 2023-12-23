import React from "react";
import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

function Homepage() {

    const navigate = useNavigate();

    const toSearch = () => {
        navigate('/games/search');
    };

    const toReviews = () => {
        navigate("/reviews");
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1}}>
                Welcome to MyGamingList!
            </Typography>
            <Button variant="contained" onClick={toSearch}>
                Search Games
            </Button>
            <Button variant="outlined" onClick={toReviews}>
                Read Reviews
            </Button>
        </Box>
    );
}

export default Homepage;