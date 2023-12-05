import React, { useState } from "react";
import { AppBar, Avatar, Box, Toolbar, Typography, Button, IconButton, Tooltip, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, AdminPanelSettings, Settings, Logout } from "@mui/icons-material";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { useDispatch } from "react-redux";
import { logUserOut } from "./actionCreators";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = evt => {
        setAnchorEl(evt.target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logUserOut());
        navigate('/');
    };

    const toLogin = () => {
        navigate('/login');
    };

    const toSignup = () => {
        navigate('/signup');
    };

    const toAccount = () => {
        navigate('/account');
    };

    const toProfile = () => {
        navigate(`/users/${username}`);
    };

    const toSettings = () => {
        navigate(`/settings`);
    };

    const username = useSelector(store => store.username);

    return (<>
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
                        <VideogameAssetIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MyGamingList
                    </Typography>

                    {!username && 
                    <>
                        <Button color="inherit" onClick={toLogin}>Login</Button>
                        <Button color="inherit" onClick={toSignup}>Signup</Button>
                    </>}

                    {username && 
                    <>
                        <Tooltip title="Account settings">
                            { username }
                            <IconButton
                                onClick={handleClick}
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="account of current user"
                                sx={{ mr: 2 }}
                                >
                                    <Avatar />
                            </IconButton>
                        </Tooltip>
                    </>}

                </Toolbar>
            </AppBar>
        </Box>

        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={isOpen}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={toProfile}>
                <AccountCircle /> View Profile
            </MenuItem>
            <MenuItem onClick={toAccount}>
                <AdminPanelSettings /> Manage Account
            </MenuItem>
            <Divider />
            <MenuItem onClick={toSettings}>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    </>);
}

export default Navbar;