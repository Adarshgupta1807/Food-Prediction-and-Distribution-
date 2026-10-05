import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Navbar({ greeting, subtitle }) {
    const { user } = useAuth();

    const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className="flex items-start justify-between px-8 pt-8 pb-2 bg-white">
            <div>
                <p className="text-slate-500 text-sm">Welcome back,</p>
                <h1 className="text-slate-900 text-2xl font-bold">
                    {greeting || user?.username || "there"}
                </h1>
                {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 text-sm px-3 py-1.5 rounded-lg">
                    📅 {today}
                </div>
                <div className="flex items-center gap-2 pl-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-white text-sm">
                        👤
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-slate-900 text-sm font-semibold leading-tight">
                            {user?.username || "User"}
                        </p>
                        <p className="text-slate-500 text-xs">
                            {user?.role === "volunteer" ? "NGO Volunteer" : "Restaurant Owner"}
                        </p>
                    </div>
                    <span className="text-slate-400 ml-1">▾</span>
                </div>
            </div>
        </header>
    );
}
