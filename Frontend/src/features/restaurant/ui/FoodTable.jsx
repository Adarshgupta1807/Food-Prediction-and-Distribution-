function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function FoodTable({ records, limit, showActions = false, onEdit, onDelete }) {
    const rows = limit ? records.slice(0, limit) : records;

    return (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-slate-900 font-semibold flex items-center gap-2">
                    🍴 Recent Food Records
                </h3>
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
                            <th className="px-6 py-3 font-medium">Cooked (kg)</th>
                            <th className="px-6 py-3 font-medium">Consumed (kg)</th>
                            <th className="px-6 py-3 font-medium">Waste (kg)</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            {showActions && <th className="px-6 py-3 font-medium">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={showActions ? 6 : 5} className="px-6 py-8 text-center text-slate-400">
                                    No food records yet. Add your first record above.
                                </td>
                            </tr>
                        ) : (
                            rows.map((record) => (
                                <tr key={record._id} className="border-b border-slate-50 last:border-0 text-slate-700">
                                    <td className="px-6 py-3.5 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {record.foodName}
                                    </td>
                                    <td className="px-6 py-3.5">{record.cookedQty}</td>
                                    <td className="px-6 py-3.5">{record.consumedQty}</td>
                                    <td className="px-6 py-3.5">{record.wasteQty}</td>
                                    <td className="px-6 py-3.5 text-slate-400">
                                        {formatDate(record.createdAt)}
                                    </td>
                                    {showActions && (
                                        <td className="px-6 py-3.5">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => onEdit?.(record)}
                                                    className="text-emerald-700 hover:underline text-xs font-medium"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => onDelete?.(record._id)}
                                                    className="text-red-500 hover:underline text-xs font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
