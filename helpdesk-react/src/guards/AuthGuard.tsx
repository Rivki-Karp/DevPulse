import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthProps {
    children: ReactNode;
}

function AuthGuard({ children }: AuthProps) {
    const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!token || !user || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default AuthGuard;
