import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
    getMyFoodRecords,
    createFoodRecord,
    updateFoodRecord,
    deleteFoodRecord,
    getFoodStats,
} from "../api/food.api";
import { getPrediction } from "../api/prediction.api";

export const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
    const { user } = useAuth();

    const [records, setRecords] = useState([]);
    const [stats, setStats] = useState({ totalCooked: 0, totalConsumed: 0, totalWaste: 0 });
    const [prediction, setPrediction] = useState(null);

    const [loading, setLoading] = useState(true);
    const [predictionLoading, setPredictionLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFoodData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [recordsData, statsData] = await Promise.all([
                getMyFoodRecords(),
                getFoodStats(),
            ]);
            setRecords(recordsData);
            setStats(statsData);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load food data");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPrediction = useCallback(async () => {
        setPredictionLoading(true);
        try {
            const data = await getPrediction();
            setPrediction(data);
        } catch {
            setPrediction(null);
        } finally {
            setPredictionLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user && user.role === "restaurant") {
            fetchFoodData();
            fetchPrediction();
        } else {
            setLoading(false);
            setPredictionLoading(false);
        }
    }, [user, fetchFoodData, fetchPrediction]);

    async function addRecord(payload) {
        await createFoodRecord(payload);
        await fetchFoodData();
        await fetchPrediction();
    }

    async function editRecord(id, updates) {
        await updateFoodRecord(id, updates);
        await fetchFoodData();
        await fetchPrediction();
    }

    async function removeRecord(id) {
        await deleteFoodRecord(id);
        await fetchFoodData();
        await fetchPrediction();
    }

    const value = {
        records,
        stats,
        prediction,
        loading,
        predictionLoading,
        error,
        addRecord,
        editRecord,
        removeRecord,
        refetch: fetchFoodData,
        refetchPrediction: fetchPrediction,
    };

    return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}