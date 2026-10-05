import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        const fallback = user.role === "volunteer" ? "/ngo-dashboard" : "/dashboard";
        return <Navigate to={fallback} replace />;
    }

    return children;
}
