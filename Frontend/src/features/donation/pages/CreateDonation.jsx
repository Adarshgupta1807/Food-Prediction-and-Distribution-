import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { useDonation } from "../hooks/useDonation";
import DonationForm from "../ui/DonationForm";

export default function CreateDonation() {
    const navigate = useNavigate();
    const { addDonation } = useDonation();

    async function handleCreate(payload) {
        await addDonation(payload);
        // Thoda ruk ke history page pe bhej do, taaki success message dikh jaye
        setTimeout(() => {
            navigate("/donations/history");
        }, 900);
    }

    return (
        <DashboardLayout subtitle="List your surplus food for NGOs to pick up.">
            <DonationForm onSubmit={handleCreate} />
        </DashboardLayout>
    );
}
