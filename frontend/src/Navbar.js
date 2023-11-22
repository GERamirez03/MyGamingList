import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logUserOut } from "./actionCreators";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logUserOut());
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>

                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Signup</Button>

                    <Button color="inherit" onClick={logout}>Logout</Button>

                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        sx={{ mr: 2 }}
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;