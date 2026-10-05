import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm({ onSubmit, loading, error }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ username, email, password, role });
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {/* Full Name */}
            <div className="mb-4">
                <label className="text-slate-700 text-sm font-medium block mb-1.5">
                    Full Name
                </label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition">
                    <span className="text-slate-400">👤</span>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="text-slate-700 text-sm font-medium block mb-1.5">
                    Email Address
                </label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition">
                    <span className="text-slate-400">✉️</span>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="mb-4">
                <label className="text-slate-700 text-sm font-medium block mb-1.5">
                    Password
                </label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition">
                    <span className="text-slate-400">🔒</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
            </div>

            {/* Select Role */}
            <div className="mb-6">
                <label className="text-slate-700 text-sm font-medium block mb-1.5">
                    Select Role
                </label>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition">
                    <span className="text-slate-400">👥</span>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="w-full bg-transparent outline-none text-sm appearance-none cursor-pointer"
                        style={{ color: role ? "#1e293b" : "#94a3b8" }}
                    >
                        <option value="" disabled>
                            Choose your role
                        </option>
                        <option value="restaurant" style={{ color: "#1e293b" }}>
                            Restaurant Owner
                        </option>
                        <option value="volunteer" style={{ color: "#1e293b" }}>
                            NGO Volunteer
                        </option>
                    </select>
                    <span className="text-slate-400">▾</span>
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Register button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition"
            >
                {loading ? "Creating account..." : "Register"}
                {!loading && <span>→</span>}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-slate-400 text-xs">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            <p className="text-center text-slate-500 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-700 hover:underline font-semibold">
                    Login
                </Link>
            </p>
        </form>
    );
}
