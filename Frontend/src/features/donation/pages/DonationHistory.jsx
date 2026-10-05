import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { useDonation } from "../hooks/useDonation";
import DonationTable from "../ui/DonationTable";
import Loader from "../../../shared/components/Loader";

export default function DonationHistory() {
    const { donations, loading, error } = useDonation();

    return (
        <DashboardLayout subtitle="Track all your donation activity.">
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {loading ? (
                <Loader label="Loading donation history..." />
            ) : (
                <DonationTable donations={donations} title="All Donations" />
            )}
        </DashboardLayout>
    );
}
