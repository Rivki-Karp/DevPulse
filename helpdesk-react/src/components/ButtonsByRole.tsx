import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { UserRole } from "../models/user.model";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

function ButtonsByRole() {
    const { user } = useSelector((state: RootState) => state.auth);
    if (!user) {
        return (
            <>
                <Button component={Link} to="/login" variant="contained" size="large" sx={{ mt: 3, mb: 2, height: '48px', width: '80%' }}>
                    Login |  Register
                </Button>
            </>
        );
    }
    return <>
        <Button component={Link} to="/tickets" size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2, height: '48px', width: '80%' }}
        >
            Go to Tickets
        </Button>

        {user?.role === UserRole.CLIENT_PM && (
            <Button component={Link} to="/tickets/new" variant="contained" size="large"
                sx={{ mt: 3, mb: 2, height: '48px', width: '80%', px: 4, py: 1.2, fontWeight: 700 }}
            >
                Create New Tickets
            </Button>
        )}

        {user?.role === UserRole.TEAM_LEAD && (
            <Button component={Link} to="/users" variant="contained" size="large"
                sx={{ mt: 3, mb: 2, height: '48px', width: '80%', px: 4, py: 1.2, fontWeight: 700 }}
            >
                Manage Users
            </Button>
        )}
    </>
}
export default ButtonsByRole;