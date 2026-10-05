import { useState } from "react";

export default function FoodForm({ onSubmit }) {
    const [foodName, setFoodName] = useState("");
    const [cookedQty, setCookedQty] = useState("");
    const [consumedQty, setConsumedQty] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (!foodName || cookedQty === "" || consumedQty === "") {
            setError("All fields are required");
            return;
        }
        if (Number(consumedQty) > Number(cookedQty)) {
            setError("Consumed quantity cannot exceed cooked quantity");
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit({
                foodName,
                cookedQty: Number(cookedQty),
                consumedQty: Number(consumedQty),
            });
            setFoodName("");
            setCookedQty("");
            setConsumedQty("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add record");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-37.5">
                <label className="text-slate-500 text-sm block mb-1">Food Name</label>
                <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g. Rice"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm outline-none focus:border-emerald-500"
                />
            </div>
            <div className="w-32">
                <label className="text-slate-500 text-sm block mb-1">Cooked (kg)</label>
                <input
                    type="number"
                    value={cookedQty}
                    onChange={(e) => setCookedQty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm outline-none focus:border-emerald-500"
                />
            </div>
            <div className="w-32">
                <label className="text-slate-500 text-sm block mb-1">Consumed (kg)</label>
                <input
                    type="number"
                    value={consumedQty}
                    onChange={(e) => setConsumedQty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm outline-none focus:border-emerald-500"
                />
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
            >
                {submitting ? "Adding..." : "Add Record"}
            </button>

            {error && <p className="w-full text-red-500 text-sm mt-1">{error}</p>}
        </form>
    );
}
