import { useState } from "react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { useFood } from "../hooks/useFood";
import FoodForm from "../ui/FoodForm";
import FoodTable from "../ui/FoodTable";
import Loader from "../../../shared/components/Loader";

export default function FoodRecords() {
    const { records, loading, error, addRecord, editRecord, removeRecord } = useFood();
    const [editingRecord, setEditingRecord] = useState(null);
    const [editValues, setEditValues] = useState({ foodName: "", cookedQty: "", consumedQty: "" });
    const [saving, setSaving] = useState(false);

    function openEdit(record) {
        setEditingRecord(record);
        setEditValues({
            foodName: record.foodName,
            cookedQty: record.cookedQty,
            consumedQty: record.consumedQty,
        });
    }

    async function handleUpdate(e) {
        e.preventDefault();
        setSaving(true);
        try {
            await editRecord(editingRecord._id, {
                foodName: editValues.foodName,
                cookedQty: Number(editValues.cookedQty),
                consumedQty: Number(editValues.consumedQty),
            });
            setEditingRecord(null);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update record");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!confirm("Delete this record?")) return;
        try {
            await removeRecord(id);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete record");
        }
    }

    return (
        <DashboardLayout subtitle="Manage and track your daily food records.">
            <FoodForm onSubmit={addRecord} />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {loading ? (
                <Loader label="Loading records..." />
            ) : (
                <FoodTable records={records} showActions onEdit={openEdit} onDelete={handleDelete} />
            )}

            {/* Edit modal */}
            {editingRecord && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm">
                        <h3 className="text-slate-900 font-semibold mb-4">Edit Food Record</h3>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <div>
                                <label className="text-slate-400 text-sm block mb-1">Food Name</label>
                                <input
                                    type="text"
                                    value={editValues.foodName}
                                    onChange={(e) =>
                                        setEditValues((v) => ({ ...v, foodName: e.target.value }))
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="text-slate-400 text-sm block mb-1">Cooked Qty (kg)</label>
                                <input
                                    type="number"
                                    value={editValues.cookedQty}
                                    onChange={(e) =>
                                        setEditValues((v) => ({ ...v, cookedQty: e.target.value }))
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="text-slate-400 text-sm block mb-1">Consumed Qty (kg)</label>
                                <input
                                    type="number"
                                    value={editValues.consumedQty}
                                    onChange={(e) =>
                                        setEditValues((v) => ({ ...v, consumedQty: e.target.value }))
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingRecord(null)}
                                    className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-xl text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white py-2 rounded-xl text-sm"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
