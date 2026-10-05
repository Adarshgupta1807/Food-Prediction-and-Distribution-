import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../ui/LoginForm";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();

    async function handleLogin(credentials) {
        try {
            const user = await login(credentials);
            if (user.role === "volunteer") {
                navigate("/ngo-dashboard", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }
        } catch {
            // error already captured by useAuth and shown in the form
        }
    }

    return (
        <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative leaves - top left */}
            <div className="absolute top-8 left-8 text-5xl opacity-70 rotate-[-15deg] hidden sm:block">🍃</div>
            {/* Decorative wave bottom left */}
            <div className="absolute bottom-0 left-0 w-2/3 h-1/2 pointer-events-none">
                <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,120 C100,80 150,180 400,150 L400,300 L0,300 Z" fill="#a7d8ba" opacity="0.6" />
                </svg>
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-emerald-700 text-3xl">🍃</span>
                    <h1 className="text-2xl font-bold text-slate-900">
                       <span className="text-emerald-600">Food Chain</span>
                    </h1>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                    Reduce Food Waste &nbsp;|&nbsp; Feed the Community
                </p>

                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-slate-900 text-2xl font-bold mb-1">Welcome Back!</h2>
                    <p className="text-slate-500 text-sm">Log in to your account to continue.</p>
                </div>

                <LoginForm onSubmit={handleLogin} loading={loading} error={error} />

                {/* Bottom illustration */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
                    <span className="text-4xl">🥗</span>
                    <p className="text-emerald-700 font-semibold text-sm leading-snug">
                        Good Food<br />Should Never<br />Go to Waste
                    </p>
                </div>
            </div>

            {/* Decorative leaves - bottom right */}
            <div className="absolute bottom-10 right-10 text-5xl opacity-70 rotate-20 hidden sm:block">🍃</div>
        </div>
    );
}
