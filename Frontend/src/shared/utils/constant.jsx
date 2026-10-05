export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const ROLES = {
    RESTAURANT: "restaurant",
    VOLUNTEER: "volunteer", // NGO
};

export const DONATION_STATUS = {
    AVAILABLE: "available",
    ACCEPTED: "accepted",
    PICKED_UP: "picked_up",
    DELIVERED: "delivered",
};
