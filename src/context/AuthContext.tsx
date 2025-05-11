import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
    user: { username: string; role: string } | null;
    token: string | null;
    login: (username: string, role: string, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ username: string; role: string } | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const login = (username: string, role: string, token: string) => {
        setUser({ username, role });
        setToken(token);
        localStorage.setItem("user", JSON.stringify({ username, role }));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};