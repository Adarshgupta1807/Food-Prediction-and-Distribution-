export default function PredictionCard({ prediction, loading }) {
    return (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-slate-900 font-semibold flex items-center gap-2">
                    <span className="text-emerald-600">🌿</span>
                    Food Waste Prediction <span className="text-slate-400 font-normal text-sm">(Next Day)</span>
                </h3>
                <span className="text-emerald-700 text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline">
                    View Details →
                </span>
            </div>

            {loading ? (
                <p className="text-slate-500 text-sm">Calculating prediction...</p>
            ) : !prediction ? (
                <p className="text-slate-500 text-sm">Not enough data yet to predict.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                            <span className="text-2xl">📅</span>
                            <div>
                                <p className="text-slate-500 text-xs">Predicted Consumption</p>
                                <p className="text-slate-900 text-lg font-bold">
                                    {prediction.predictedConsumption} kg
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                            <span className="text-2xl">🍲</span>
                            <div>
                                <p className="text-slate-500 text-xs">Recommended Cooking</p>
                                <p className="text-slate-900 text-lg font-bold">
                                    {prediction.recommendedCooking} kg
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                            <span className="text-2xl">🗑️</span>
                            <div>
                                <p className="text-slate-500 text-xs">Expected Waste</p>
                                <p className="text-slate-900 text-lg font-bold">
                                    {prediction.expectedWaste} kg
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-400 text-xs mt-4">⊕ Based on your last 7 days data</p>
                </>
            )}
        </div>
    );
}
