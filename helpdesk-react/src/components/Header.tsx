import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../store/authSlice";
import type { RootState } from "../store/store";
import TerminalIcon from '@mui/icons-material/Terminal';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';
//import { useState } from "react";


interface HeaderProps {
    toggleColorMode: () => void;
}

function Header({ toggleColorMode }: HeaderProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
   // const [role, setRole] = useState<string>("");
    const { user, token } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, top: 0, left: 0, right: 0, backgroundColor: 'background.paper', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={token ? "/dashboard" : "/"}
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
                    >
                        DevPulse
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>

                        {token ? (
                            <>
                                <Typography variant="body1" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
                                    Hello, <span style={{ color: '#00ffa3' }}>{user?.name}</span>
                                </Typography>
                                <Button variant="outlined" color="inherit" component={Link} to="/tickets" sx={{ borderRadius: 2 }}>
                                    My Tickets
                                </Button>
                                <IconButton color="primary" onClick={handleLogout} title="Logout">
                                    <LogoutIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/login" color="inherit">Login</Button>
                                <Button component={Link} to="/register" variant="contained" color="primary">Register</Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;