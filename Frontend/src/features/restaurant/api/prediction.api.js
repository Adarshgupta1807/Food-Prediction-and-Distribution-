import axiosInstance from "../../../shared/api/axiosInstance";

export async function getPrediction() {
    const res = await axiosInstance.get("/predict");
    return res.data; // { predictedConsumption, recommendedCooking, expectedWaste, reasoning? }
}
