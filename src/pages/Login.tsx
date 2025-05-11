import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL as string;

    const handleLogin = async () => {
        try {
            const response = await fetch(`${baseApiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                setError(error);
                return;
            }

            const { token } = await response.json();
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
            login(decodedToken.username, decodedToken.role, token); // Pass the token to the login function
            navigate("/"); // Redirect to home after login
        } catch (err) {
            setError("An error occurred while logging in.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 px-4 py-2 border rounded-md"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 px-4 py-2 border rounded-md"
            />
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Login
            </button>
        </div>
    );
};