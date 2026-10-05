import { useContext } from "react";
import { NgoContext } from "../state/ngo.context";

export function useNgo() {
    const { availableDonations, acceptedDonations, loading, error, accept, changeStatus, refetch } =
        useContext(NgoContext);

    return { availableDonations, acceptedDonations, loading, error, accept, changeStatus, refetch };
}
