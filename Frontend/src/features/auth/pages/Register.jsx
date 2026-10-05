import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RegisterForm from "../ui/RegisterForm";

export default function Register() {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();

    async function handleRegister(details) {
        try {
            const user = await register(details);
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
            {/* Decorative leaves */}
            <div className="absolute top-8 right-10 text-5xl opacity-70 rotate-15 hidden sm:block">🍃</div>
            <div className="absolute bottom-10 right-16 text-4xl opacity-60 rotate-[-10deg] hidden sm:block">🍃</div>

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
                    <h2 className="text-slate-900 text-2xl font-bold mb-1">Create Your Account</h2>
                    <p className="text-slate-500 text-sm">Join us and make a difference.</p>
                </div>

                <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
            </div>
        </div>
    );
}
