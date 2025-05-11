export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`, // Add the Bearer token
        "Content-Type": "application/json", // Default content type
    };

    const updatedOptions = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, updatedOptions);

        if (!response.ok) {
            // Handle unauthorized or other errors
            if (response.status === 401) {
                console.error("Unauthorized access. Redirecting to login...");
                // Optionally, redirect to login or logout the user
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return response.json(); // Parse JSON response
        } else {
            return response.text(); // Return text for non-JSON responses
        }
    } catch (error) {
        console.error("Error in authFetch:", error);
        throw error;
    }
};