export default function NgoStatsCard({ icon, label, value, trend }) {
    return (
        <div className="flex-1 min-w-45 rounded-2xl bg-emerald-950 p-5 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700 flex items-center justify-center text-xl text-white">
                {icon}
            </div>
            <div>
                <p className="text-emerald-300/70 text-sm">{label}</p>
                <p className="text-white text-2xl font-bold">{value}</p>
                {trend && <p className="text-emerald-400 text-xs font-medium mt-1">{trend}</p>}
            </div>
        </div>
    );
}
