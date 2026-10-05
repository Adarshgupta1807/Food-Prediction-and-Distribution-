import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({ onSubmit, loading, error }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ email, password, rememberMe });
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
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
                        placeholder="Enter your password"
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

            {/* Remember me / Forgot password */}
            <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-slate-600 text-sm cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    Remember me
                </label>
                <Link to="/forgot-password" className="text-emerald-600 text-sm font-medium hover:underline">
                    Forgot password?
                </Link>
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Login button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition"
            >
                {loading ? "Logging in..." : "Login"}
                {!loading && <span>→</span>}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-slate-400 text-xs">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
            </div>

            <p className="text-center text-slate-500 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-emerald-700 hover:underline font-semibold">
                    Register
                </Link>
            </p>
        </form>
    );
}
