import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material"
import UserContext from "./userContext";

function AccountViewer() {

    const apiHelper = useContext(UserContext);
    const username = useSelector(store => store.username);

    const [user, setUser] = useState(null);

    useEffect(function fetchUserWhenMounted() {
        async function fetchUser() {
            let userData = await apiHelper.getUserData(username);
            setUser(userData);
        }
        fetchUser();
    }, []);

    if (user === null) return <Typography>Loading...</Typography>

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1}}>
                Account
            </Typography>

            <Typography variant="h3" component="div" sx={{ flexGrow: 1}}>
                Username: { username }
            </Typography>

            <Typography variant="h3" component="div" sx={{ flexGrow: 1}}>
                Email: { user.email }
            </Typography>
        </Box>
    );
}

export default AccountViewer;