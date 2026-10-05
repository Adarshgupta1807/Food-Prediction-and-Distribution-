import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { useFood } from "../hooks/useFood";
import { usePrediction } from "../hooks/usePrediction";
import StatsCard from "../ui/StatsCard";
import PredictionCard from "../ui/PredictionCard";
import Loader from "../../../shared/components/Loader";

export default function Analytics() {
    const { records, stats, loading } = useFood();
    const { prediction, loading: predictionLoading } = usePrediction();

    const wastePercentage =
        stats.totalCooked > 0 ? ((stats.totalWaste / stats.totalCooked) * 100).toFixed(1) : 0;

    const last7 = records.slice(0, 7);

    return (
        <DashboardLayout subtitle="Insights into your food waste trends.">
            {loading ? (
                <Loader label="Loading analytics..." />
            ) : (
                <>
                    <div className="flex flex-wrap gap-4">
                        <StatsCard icon="👨‍🍳" label="Total Cooked" value={stats.totalCooked} unit="kg" />
                        <StatsCard icon="🍴" label="Total Consumed" value={stats.totalConsumed} unit="kg" />
                        <StatsCard icon="🗑️" label="Total Waste" value={stats.totalWaste} unit="kg" />
                        <StatsCard icon="📊" label="Waste %" value={wastePercentage} unit="%" />
                    </div>

                    <PredictionCard prediction={prediction} loading={predictionLoading} />

                    {/* Simple bar visualization of last 7 records */}
                    <div className="rounded-2xl bg-white border border-slate-200 p-5">
                        <h3 className="text-slate-900 font-semibold mb-5">Cooked vs Consumed (Last 7 records)</h3>

                        {last7.length === 0 ? (
                            <p className="text-slate-500 text-sm">No data yet to visualize.</p>
                        ) : (
                            <div className="space-y-3">
                                {last7.map((record) => {
                                    const maxVal = Math.max(record.cookedQty, record.consumedQty, 1);
                                    return (
                                        <div key={record._id}>
                                            <div className="flex justify-between text-sm text-slate-600 mb-1">
                                                <span>{record.foodName}</span>
                                                <span className="text-slate-500">
                                                    {record.consumedQty}/{record.cookedQty} kg
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-600 rounded-full"
                                                    style={{
                                                        width: `${(record.consumedQty / maxVal) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}
