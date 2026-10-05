import axiosInstance from "../../../shared/api/axiosInstance";

// Note: backend has one /api/donations endpoint that returns different data
// based on role (NGO gets "available" donations, restaurant gets its own).
// So NGO-specific calls just reuse the same donation routes.

export async function getAvailableDonations() {
    const res = await axiosInstance.get("/donations");
    return res.data.donations; // backend filters status:"available" for volunteer role
}

export async function acceptDonation(id) {
    const res = await axiosInstance.patch(`/donations/${id}/accept`);
    return res.data;
}

export async function updateDonationStatus(id, status) {
    const res = await axiosInstance.patch(`/donations/${id}/status`, { status });
    return res.data;
}
