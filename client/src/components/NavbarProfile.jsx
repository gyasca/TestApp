import { useState, useContext } from "react";
import { Avatar, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Popover, Divider, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ProfilePicture from "./ProfilePicture";
import { UserContext } from "../main";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import SupportIcon from '@mui/icons-material/Support';
import { enqueueSnackbar } from "notistack";

export function NavbarProfile() {
    const { user, setUser } = useContext(UserContext);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()

    function handlePopoverOpen(event) {
        setAnchorEl(event.currentTarget);
        // console.log(user);
        setIsPopoverOpen(true);
    }

    function handleLogout() {
        setIsPopoverOpen(false)
        localStorage.removeItem("accessToken")
        setUser(null)
        enqueueSnackbar("Successfully logged out", { variant: "success" })
        navigate("/")
    }

    return (
        <>
            <IconButton onClick={(e) => handlePopoverOpen(e)}>
                <Avatar></Avatar>
                {/* <ProfilePicture user={user} /> */}
            </IconButton>
            <Popover
                id={"userPopover"}
                open={isPopoverOpen}
                anchorEl={anchorEl}
                onClose={() => setIsPopoverOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    horizontal: 'right',
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", margin: "1rem" }}>
                    {/* <ProfilePicture user={user} /> */}
                    <Avatar></Avatar>
                    <Box marginLeft={"1rem"}>
                        <Typography variant="subtitle1">{user.name}</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ marginTop: "1rem" }} />
                <List>
                    <ListItem key={"My Profile"} disablePadding>
                        <ListItemButton component={Link} to="/profile" onClick={() => setIsPopoverOpen(false)}>
                            <ListItemIcon><PersonIcon /></ListItemIcon>
                            <ListItemText primary={"My Profile"} />
                        </ListItemButton>
                    </ListItem>
                  
                    { user.account_type == "hr" && 
                    <ListItem key={"Admin Panel"} disablePadding>
                        <ListItemButton component={Link} to="/admin/panel" onClick={() => setIsPopoverOpen(false)}>
                            <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                            <ListItemText primary={"HR Panel"} />
                        </ListItemButton>
                    </ListItem> }
                    { user.account_type == "hr" && 
                    <ListItem key={"Register new employee"} disablePadding>
                        <ListItemButton component={Link} to="/admin/register" onClick={() => setIsPopoverOpen(false)}>
                            <ListItemIcon><BadgeIcon /></ListItemIcon>
                            <ListItemText primary={"Register new employee"} />
                        </ListItemButton>
                    </ListItem> }
                    <ListItem key={"Support"} disablePadding>
                        <ListItemButton component={Link} to="/support" onClick={() => setIsPopoverOpen(false)}>
                            <ListItemIcon><SupportIcon /></ListItemIcon>
                            <ListItemText primary={"Support"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Logout"} disablePadding>
                        <ListItemButton onClick={() => handleLogout()}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </>
    )
}