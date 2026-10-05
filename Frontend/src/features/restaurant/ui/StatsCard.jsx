export default function StatsCard({ icon, label, value, unit, trend }) {
    return (
        <div className="flex-1 min-w-45 rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700 flex items-center justify-center text-xl text-white">
                {icon}
            </div>
            <div>
                <p className="text-slate-500 text-sm">{label}</p>
                <p className="text-slate-900 text-2xl font-bold">
                    {value}
                    {unit ? <span className="text-base font-medium text-slate-400 ml-1">{unit}</span> : null}
                </p>
                {trend && <p className="text-emerald-600 text-xs font-medium mt-1">{trend}</p>}
            </div>
        </div>
    );
}
