import { Link } from "react-router-dom";

export default function PromoBanner({ icon, title, description, buttonLabel, buttonTo, compact = false }) {
    if (compact) {
        // Small tagline banner (e.g. bottom of dashboard)
        return (
            <div className="rounded-2xl bg-linear-to-r from-emerald-900 to-emerald-950 px-6 py-5 flex items-center gap-4">
                <span className="text-3xl">{icon}</span>
                <div>
                    <p className="text-white font-semibold">{title}</p>
                    <p className="text-emerald-300/80 text-sm">{description}</p>
                </div>
                <span className="text-3xl ml-auto hidden sm:block">{icon}</span>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-700 to-emerald-950 px-7 py-8 flex items-center justify-between">
            <div className="max-w-sm">
                <p className="text-white text-xl font-bold leading-snug mb-2">{title}</p>
                <p className="text-emerald-200/90 text-sm mb-5">{description}</p>
                {buttonLabel && (
                    <Link
                        to={buttonTo}
                        className="inline-flex items-center gap-2 bg-white text-emerald-800 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition"
                    >
                        {buttonLabel} <span>→</span>
                    </Link>
                )}
            </div>
            <div className="hidden sm:flex w-28 h-28 rounded-full bg-emerald-600/30 items-center justify-center text-5xl shrink-0">
                {icon}
            </div>
        </div>
    );
}
