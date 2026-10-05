import { useContext } from "react";
import { RestaurantContext } from "../state/restaurant.context";

export function usePrediction() {
    const { prediction, predictionLoading, refetchPrediction } = useContext(RestaurantContext);

    return {
        prediction,
        loading: predictionLoading,
        refetch: refetchPrediction,
    };
}
