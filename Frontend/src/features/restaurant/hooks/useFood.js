import { useContext } from "react";
import { RestaurantContext } from "../state/restaurant.context";

export function useFood() {
    const { records, stats, loading, error, addRecord, editRecord, removeRecord, refetch } =
        useContext(RestaurantContext);

    return { records, stats, loading, error, addRecord, editRecord, removeRecord, refetch };
}
