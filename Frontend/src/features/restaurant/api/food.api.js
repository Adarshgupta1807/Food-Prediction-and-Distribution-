import axiosInstance from "../../../shared/api/axiosInstance";

export async function createFoodRecord({ foodName, cookedQty, consumedQty }) {
    const res = await axiosInstance.post("/food", {
        foodName,
        cookedQty,
        consumedQty,
    });
    return res.data;
}

export async function getMyFoodRecords() {
    const res = await axiosInstance.get("/food");
    return res.data.records;
}

export async function updateFoodRecord(id, updates) {
    const res = await axiosInstance.put(`/food/${id}`, updates);
    return res.data;
}

export async function deleteFoodRecord(id) {
    const res = await axiosInstance.delete(`/food/${id}`);
    return res.data;
}

export async function getFoodStats() {
    const res = await axiosInstance.get("/food/stats");
    return res.data; // { totalCooked, totalConsumed, totalWaste }
}
