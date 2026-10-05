import { useState } from "react";

export default function DonationForm({ onSubmit }) {
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!foodName || !quantity) {
            setError("Food name and quantity are required");
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit({
                foodName,
                quantity: Number(quantity),
                pickupTime: pickupTime ? new Date(pickupTime).toISOString() : undefined,
            });
            setFoodName("");
            setQuantity("");
            setPickupTime("");
            setSuccess(true);
        } catch (err) {
    console.error("FULL ERROR:", err);
    console.error("Response:", err.response);
    console.error("Message:", err.message);
    setError(err.response?.data?.message || err.message || "Failed to create donation");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white border border-slate-200 p-6 max-w-lg space-y-4"
        >
            <h3 className="text-slate-900 font-semibold text-lg">🎁 Create Donation</h3>

            <div>
                <label className="text-slate-500 text-sm block mb-1">Food Name</label>
                <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g. Rice"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm outline-none focus:border-emerald-500"
                />
            </div>

            <div>
                <label className="text-slate-500 text-sm block mb-1">Quantity (kg)</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm outline-none focus:border-emerald-500"
                />
            </div>

            <div>
                <label className="text-slate-500 text-sm block mb-1">Pickup Time</label>
                <input
                    type="datetime-local"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm outline-none focus:border-emerald-500"
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-emerald-600 text-sm">Donation created successfully!</p>}

            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl"
            >
                {submitting ? "Creating..." : "Create Donation"}
            </button>
        </form>
    );
}
