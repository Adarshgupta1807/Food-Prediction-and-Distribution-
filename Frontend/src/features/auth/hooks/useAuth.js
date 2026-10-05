import { useContext, useState } from "react";
import { AuthContext } from "../state/auth.context";
import { loginUser, registerUser, logoutUser } from "../api/auth.api";

export function useAuth() {
    const { user, loginSuccess, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function login(credentials) {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser(credentials);
            loginSuccess(data.user);
            return data.user;
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function register(details) {
        setLoading(true);
        setError(null);
        try {
            const data = await registerUser(details);
            loginSuccess(data.user);
            return data.user;
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        try {
            await logoutUser();
        } catch {
            // ignore — cookie clear ho jayegi client side bhi
        }
        logout();
    }

    return { user, login, register, signOut, loading, error };
}
