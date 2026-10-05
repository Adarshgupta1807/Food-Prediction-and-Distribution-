import { useState } from "react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import PromoBanner from "../../../shared/components/PromoBanner";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNgo } from "../hooks/useNgo";
import NgoStatsCard from "../ui/NgoStatsCard";
import AvailableDonationTable from "../ui/AvailableDonationTable";
import DonationTable from "../../donation/ui/DonationTable";
import Loader from "../../../shared/components/Loader";

export default function NgoDashboard() {
    const { user } = useAuth();
    const { availableDonations, acceptedDonations, loading, accept, refetch } = useNgo();
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
        <DashboardLayout
            greeting={user?.username || "NGO"}
            subtitle="Together we can make a difference!"
        >
            {loading ? (
                <Loader label="Loading dashboard..." />
            ) : (
                <>
                    <div className="flex flex-wrap gap-4">
                        <NgoStatsCard icon="🎁" label="Available Donations" value={availableDonations.length} />
                        <NgoStatsCard icon="✅" label="Accepted Donations" value={acceptedDonations.length} />
                        <NgoStatsCard
                            icon="🚚"
                            label="Picked Up Donations"
                            value={acceptedDonations.filter((d) => d.status === "picked_up").length}
                        />
                    </div>

                    <PromoBanner
                        icon="🤲"
                        title="Together Against Food Waste"
                        description="Rescue good food, support communities, create a healthier tomorrow."
                        buttonLabel="View Available Donations"
                        buttonTo="/donations/available"
                    />

                    <AvailableDonationTable
                        donations={availableDonations}
                        onAccept={handleAccept}
                        acceptingId={acceptingId}
                        onRefresh={handleRefresh}
                        refreshing={refreshing}
                    />

                    <DonationTable donations={acceptedDonations} title="My Accepted Donations" />

                    <PromoBanner
                        icon="🍃"
                        title="Food for People, Not for Waste"
                        description="Your support helps us reach more people in need."
                        compact
                    />
                </>
            )}
        </DashboardLayout>
    );
}
