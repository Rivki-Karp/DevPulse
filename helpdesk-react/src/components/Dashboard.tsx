import { useSelector } from 'react-redux';
import { ROLE_DISPLAY_NAMES, UserRole } from '../models/user.model';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import type { RootState } from '../store/store';
import TeamLeadView from './Dashboards/TeamLeadView';
import DeveloperView from './Dashboards/DeveloperView';
import ClientPMView from './Dashboards/ClientPMView';
import ButtonsByRole from './ButtonsByRole';


function Dashboard() {
    const { user } = useSelector((state: RootState) => state.auth);

    const renderDashboardByRole = () => {
        switch (user?.role) {
            case UserRole.TEAM_LEAD:
                return <TeamLeadView />;
            case UserRole.DEVELOPER:
                return <DeveloperView />;
            case UserRole.CLIENT_PM:
                return <ClientPMView />;
            default:
                return (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <CircularProgress size={48} thickness={4} color="primary" />
                    </Box>
                );
        }
    };

    return (
        <>
        <ButtonsByRole />

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Welcome back, {user?.name || 'Guest'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Role: {user?.role ? ROLE_DISPLAY_NAMES[user.role] : ''}
                </Typography>
            </Box>

            {renderDashboardByRole()}
        </Container>
        </>
    );
};

export default Dashboard;