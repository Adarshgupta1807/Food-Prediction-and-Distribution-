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

export default function DonationCard({ donation, actionLabel, onAction, actionDisabled }) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="text-slate-900 font-semibold">{donation.foodName}</h4>
                    <p className="text-slate-500 text-sm">{donation.quantity} kg</p>
                </div>
                <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[donation.status]}`}
                >
                    {STATUS_LABELS[donation.status]}
                </span>
            </div>

            <p className="text-slate-500 text-sm">🕓 Pickup: {formatPickupTime(donation.pickupTime)}</p>

            {actionLabel && (
                <button
                    onClick={() => onAction?.(donation._id)}
                    disabled={actionDisabled}
                    className="mt-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-xl"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
