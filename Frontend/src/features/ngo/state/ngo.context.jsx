import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { getAvailableDonations, acceptDonation, updateDonationStatus } from "../api/ngo.api";

export const NgoContext = createContext(null);

export function NgoProvider({ children }) {
    const { user } = useAuth();

    const [availableDonations, setAvailableDonations] = useState([]);
    const [acceptedDonations, setAcceptedDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAvailable = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAvailableDonations();
            setAvailableDonations(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load donations");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user && user.role === "volunteer") {
            fetchAvailable();
        } else {
            setLoading(false);
        }
    }, [user, fetchAvailable]);

    async function accept(id) {
        const result = await acceptDonation(id);
        setAcceptedDonations((prev) => [result.donation, ...prev]);
        await fetchAvailable();
    }

    async function changeStatus(id, status) {
        const result = await updateDonationStatus(id, status);
        setAcceptedDonations((prev) =>
            prev.map((d) => (d._id === id ? result.donation : d))
        );
    }

    const value = {
        availableDonations,
        acceptedDonations,
        loading,
        error,
        accept,
        changeStatus,
        refetch: fetchAvailable,
    };

    return <NgoContext.Provider value={value}>{children}</NgoContext.Provider>;
}