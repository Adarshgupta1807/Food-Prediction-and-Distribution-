import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
    getDonations,
    createDonation,
    acceptDonation,
    updateDonationStatus,
} from "../api/donation.api";

export const DonationContext = createContext(null);

export function DonationProvider({ children }) {
    const { user } = useAuth();

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDonations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getDonations();
            setDonations(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load donations");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchDonations();
        } else {
            setLoading(false);
        }
    }, [user, fetchDonations]);

    async function addDonation(payload) {
        await createDonation(payload);
        await fetchDonations();
    }

    async function accept(id) {
        await acceptDonation(id);
        await fetchDonations();
    }

    async function changeStatus(id, status) {
        await updateDonationStatus(id, status);
        await fetchDonations();
    }

    const value = {
        donations,
        loading,
        error,
        addDonation,
        accept,
        changeStatus,
        refetch: fetchDonations,
    };

    return <DonationContext.Provider value={value}>{children}</DonationContext.Provider>;
}