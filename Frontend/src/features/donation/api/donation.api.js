import axiosInstance from "../../../shared/api/axiosInstance";

export async function createDonation({ foodName, quantity, pickupTime }) {
    const res = await axiosInstance.post("/donations", {
        foodName,
        quantity,
        pickupTime,
    });
    return res.data;
}

// Restaurant ke liye apni donations, NGO ke liye available donations
// (backend req.user.role dekh ke khud decide karta hai)
export async function getDonations() {
    const res = await axiosInstance.get("/donations");
    return res.data.donations;
}

export async function acceptDonation(id) {
    const res = await axiosInstance.patch(`/donations/${id}/accept`);
    return res.data;
}

export async function updateDonationStatus(id, status) {
    const res = await axiosInstance.patch(`/donations/${id}/status`, { status });
    return res.data;
}
