import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import PromoBanner from "../../../shared/components/PromoBanner";
import { useAuth } from "../../auth/hooks/useAuth";
import { useFood } from "../hooks/useFood";
import { usePrediction } from "../hooks/usePrediction";
import { useDonation } from "../../donation/hooks/useDonation";
import StatsCard from "../ui/StatsCard";
import PredictionCard from "../ui/PredictionCard";
import FoodTable from "../ui/FoodTable";
import DonationTable from "../../donation/ui/DonationTable";
import Loader from "../../../shared/components/Loader";

export default function Dashboard() {
    const { user } = useAuth();
    const { records, stats, loading: foodLoading } = useFood();
    const { prediction, loading: predictionLoading } = usePrediction();
    const { donations, loading: donationLoading } = useDonation();

    return (
        <DashboardLayout
            greeting={user?.username || "Restaurant"}
            subtitle="Here's your food waste summary and donation overview."
        >
            {foodLoading ? (
                <Loader label="Loading stats..." />
            ) : (
                <div className="flex flex-wrap gap-4">
                    <StatsCard icon="👨‍🍳" label="Total Cooked" value={stats.totalCooked} unit="kg" />
                    <StatsCard icon="🍴" label="Total Consumed" value={stats.totalConsumed} unit="kg" />
                    <StatsCard icon="🗑️" label="Total Waste" value={stats.totalWaste} unit="kg" />
                    <StatsCard icon="💚" label="Total Donations" value={donations.length} />
                </div>
            )}

            <PromoBanner
                icon="🥗"
                title="Lower Food Waste, Build a Greener Tomorrow"
                description="Every good meal counts. Donate surplus food and make a positive impact."
                buttonLabel="Create Donation"
                buttonTo="/donations/create"
            />

            <PredictionCard prediction={prediction} loading={predictionLoading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {foodLoading ? <Loader /> : <FoodTable records={records} limit={4} />}
                {donationLoading ? <Loader /> : <DonationTable donations={donations} limit={4} />}
            </div>

            <PromoBanner
                icon="🍃"
                title="Small Steps. Big Impact."
                description="Your food, your responsibility. Help reduce food waste."
                compact
            />
        </DashboardLayout>
    );
}
