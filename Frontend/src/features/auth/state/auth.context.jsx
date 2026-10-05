import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Login/register response se mila user yahan store hota hai
    // Page refresh pe localStorage se restore kar lete hain (sirf UI ke liye,
    // asli auth check hamesha backend cookie/JWT se hota hai)
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("foodchain_user");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("foodchain_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("foodchain_user");
        }
    }, [user]);

    function loginSuccess(userData) {
        setUser(userData);
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loginSuccess, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
