import SideBar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { useThemeContext } from '../contexts/ThemeContext';

function Layout() {
    const { toggleColorMode } = useThemeContext();

    return (
        <Box sx={{ display: 'flex', minHeight: '80vh' }}>
            <Header toggleColorMode={toggleColorMode} />
            <SideBar />
            
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1,
                    width: { sm: '100%' }
                }}
            >
                <Toolbar />
                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
