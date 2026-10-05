function formatPickupTime(dateStr) {
    if (!dateStr) return "Not set";
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export default function AvailableDonationTable({ donations, onAccept, acceptingId, onRefresh, refreshing }) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-slate-900 font-semibold flex items-center gap-2">
                    🎁 Available Donations
                </h3>
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        disabled={refreshing}
                        className="text-emerald-700 text-sm font-medium hover:underline disabled:opacity-50"
                    >
                        {refreshing ? "Refreshing..." : "View All →"}
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-slate-400 text-left border-b border-slate-100">
                            <th className="px-6 py-3 font-medium">Food Item</th>
                            <th className="px-6 py-3 font-medium">Quantity (kg)</th>
                            <th className="px-6 py-3 font-medium">Restaurant</th>
                            <th className="px-6 py-3 font-medium">Pickup Time</th>
                            <th className="px-6 py-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                    No donations available right now.
                                </td>
                            </tr>
                        ) : (
                            donations.map((donation) => (
                                <tr key={donation._id} className="border-b border-slate-50 last:border-0 text-slate-700">
                                    <td className="px-6 py-3.5 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {donation.foodName}
                                    </td>
                                    <td className="px-6 py-3.5">{donation.quantity}</td>
                                    <td className="px-6 py-3.5 text-slate-500">
                                        {donation.restaurantId?.username || "Unknown"}
                                    </td>
                                    <td className="px-6 py-3.5 text-slate-500">
                                        {formatPickupTime(donation.pickupTime)}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <button
                                            onClick={() => onAccept(donation._id)}
                                            disabled={acceptingId === donation._id}
                                            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg"
                                        >
                                            {acceptingId === donation._id ? "Accepting..." : "Accept"}
                                        </button>
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
