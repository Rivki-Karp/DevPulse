import { useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Drawer, IconButton, List,  ListItem, ListItemButton,  ListItemIcon, ListItemText, Box,useTheme,useMediaQuery,Toolbar} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import type { RootState } from "../store/store";

export interface SideBarLink {
    name: string;
    path?: string;
    icon?: JSX.Element;
    rolesAllowed?: string[];
}

export const sideBarlinks: SideBarLink[] = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon />, rolesAllowed: ["admin", "agent", "customer"] },
    { name: "Tickets", path: "/tickets", icon: <ConfirmationNumberIcon />, rolesAllowed: ["admin", "agent", "customer"] },
    { name: "Users", path: "/users", icon: <PeopleIcon />, rolesAllowed: ["admin"] }
];

const drawerWidth = 240;

function SideBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Filter links based on user role
    const filteredLinks = sideBarlinks.filter((link) => {
        if (!link.rolesAllowed || link.rolesAllowed.length === 0) {
            return true;
        }
        return user?.role && link.rolesAllowed.includes(user.role);
    });

    const drawer = (
        <Box>
            <Toolbar />
            <List>
                {filteredLinks.map((link) => (
                    <ListItem key={link.name} disablePadding>
                        <ListItemButton 
                            component={Link} 
                            to={link.path || "#"}
                            onClick={isMobile ? handleDrawerToggle : undefined}
                        >
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText primary={link.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ 
                        position: 'fixed',
                        top: 8,
                        left: 8,
                        zIndex: theme.zIndex.drawer + 2
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: drawerWidth 
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: drawerWidth 
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default SideBar;