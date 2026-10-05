const STATUS_STYLES = {
    available: "bg-blue-100 text-blue-700",
    accepted: "bg-emerald-100 text-emerald-700",
    picked_up: "bg-violet-100 text-violet-700",
    delivered: "bg-slate-100 text-slate-600",
};

const STATUS_LABELS = {
    available: "Available",
    accepted: "Accepted",
    picked_up: "Picked Up",
    delivered: "Delivered",
};

function formatPickupTime(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export default function DonationTable({ donations, limit, title = "My Donations" }) {
    const rows = limit ? donations.slice(0, limit) : donations;

    return (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-slate-900 font-semibold flex items-center gap-2">🎁 {title}</h3>
                {limit && (
                    <button className="text-emerald-700 text-sm font-medium hover:underline">
                        View All →
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-slate-400 text-left border-b border-slate-100">
                            <th className="px-6 py-3 font-medium">Food Item</th>
                            <th className="px-6 py-3 font-medium">Quantity</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Pickup Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                    No donations yet.
                                </td>
                            </tr>
                        ) : (
                            rows.map((donation) => (
                                <tr key={donation._id} className="border-b border-slate-50 last:border-0 text-slate-700">
                                    <td className="px-6 py-3.5 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {donation.foodName}
                                    </td>
                                    <td className="px-6 py-3.5">{donation.quantity} kg</td>
                                    <td className="px-6 py-3.5">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[donation.status]}`}
                                        >
                                            {STATUS_LABELS[donation.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-slate-400">
                                        {formatPickupTime(donation.pickupTime)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
