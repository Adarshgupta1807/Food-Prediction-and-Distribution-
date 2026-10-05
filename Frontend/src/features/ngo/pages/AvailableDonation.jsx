import { useState } from "react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { useNgo } from "../hooks/useNgo";
import AvailableDonationTable from "../ui/AvailableDonationTable";
import Loader from "../../../shared/components/Loader";

export default function AvailableDonations() {
    const { availableDonations, loading, error, accept, refetch } = useNgo();
    const [acceptingId, setAcceptingId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    async function handleAccept(id) {
        setAcceptingId(id);
        try {
            await accept(id);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to accept donation");
        } finally {
            setAcceptingId(null);
        }
    }

    async function handleRefresh() {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <DashboardLayout subtitle="Browse and accept available donations.">
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {loading ? (
                <Loader label="Loading available donations..." />
            ) : (
                <AvailableDonationTable
                    donations={availableDonations}
                    onAccept={handleAccept}
                    acceptingId={acceptingId}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
            )}
        </DashboardLayout>
    );
}
