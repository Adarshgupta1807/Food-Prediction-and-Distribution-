import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import { useAuth } from "../features/auth/hooks/useAuth";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Dashboard from "../features/restaurant/pages/Dashboard";
import FoodRecords from "../features/restaurant/pages/FoodRecords";
import Analytics from "../features/restaurant/pages/Analytics";

import CreateDonation from "../features/donation/pages/CreateDonation";
import DonationHistory from "../features/donation/pages/DonationHistory";

import NgoDashboard from "../features/ngo/pages/NgoDashboard";
import AvailableDonation from "../features/ngo/pages/AvailableDonation";

function RootRedirect() {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return user.role === "volunteer"
        ? <Navigate to="/ngo-dashboard" replace />
        : <Navigate to="/dashboard" replace />;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["restaurant"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/food-records" element={<ProtectedRoute allowedRoles={["restaurant"]}><FoodRecords /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute allowedRoles={["restaurant"]}><Analytics /></ProtectedRoute>} />
            <Route path="/donations/create" element={<ProtectedRoute allowedRoles={["restaurant"]}><CreateDonation /></ProtectedRoute>} />
            <Route path="/donations/history" element={<ProtectedRoute allowedRoles={["restaurant", "volunteer"]}><DonationHistory /></ProtectedRoute>} />

            <Route path="/ngo-dashboard" element={<ProtectedRoute allowedRoles={["volunteer"]}><NgoDashboard /></ProtectedRoute>} />
            <Route path="/donations/available" element={<ProtectedRoute allowedRoles={["volunteer"]}><AvailableDonation /></ProtectedRoute>} />

            <Route path="/" element={<RootRedirect />} />
            <Route path="*" element={<RootRedirect />} />
        </Routes>
    );
}
