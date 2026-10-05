import { useContext } from "react";
import { DonationContext } from "../state/donation.context";

export function useDonation() {
    const { donations, loading, error, addDonation, accept, changeStatus, refetch } =
        useContext(DonationContext);

    return { donations, loading, error, addDonation, accept, changeStatus, refetch };
}
