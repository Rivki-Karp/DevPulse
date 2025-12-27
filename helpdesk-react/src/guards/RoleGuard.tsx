import type { ReactNode } from "react";
import type { UserRole } from "../models/user.model";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RoleProps {
    children: ReactNode;
    allowedRoles: UserRole[];
}

function RoleGuard({ children, allowedRoles }: RoleProps) {
    const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);

    if (!token || !isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

export default RoleGuard;
