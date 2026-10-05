import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const RESTAURANT_LINKS = [
    { to: "/dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/food-records", label: "Food Records", icon: "📋" },
    { to: "/donations/create", label: "Create Donation", icon: "🎁" },
    { to: "/donations/history", label: "Donation History", icon: "🕓" },
    { to: "/analytics", label: "Analytics", icon: "📊" },
];

const NGO_LINKS = [
    { to: "/ngo-dashboard", label: "Dashboard", icon: "🏠" },
    { to: "/donations/available", label: "Available Donations", icon: "🎁" },
    { to: "/donations/history", label: "History", icon: "🕓" },
];

export default function Sidebar() {
    const { user, signOut } = useAuth();
    const links = user?.role === "volunteer" ? NGO_LINKS : RESTAURANT_LINKS;

    return (
        <aside className="w-64 bg-emerald-950 flex flex-col h-screen sticky top-0">
            <div className="flex items-center gap-2 px-6 py-6">
                <span className="text-emerald-400 text-2xl">🍃</span>
                <div>
                    <p className="text-white font-bold leading-tight">FoodChain</p>
                    <p className="text-emerald-400/70 text-xs">Reduce Food Waste</p>
                </div>
            </div>

            <nav className="flex-1 px-4 mt-2 space-y-1.5">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                                isActive
                                    ? "bg-emerald-700 text-white"
                                    : "text-emerald-200/70 hover:bg-emerald-900 hover:text-emerald-100"
                            }`
                        }
                    >
                        <span>{link.icon}</span>
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={signOut}
                className="mx-4 mb-6 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-200/70 hover:bg-emerald-900 hover:text-emerald-100"
            >
                ↩️ Logout
            </button>
        </aside>
    );
}
