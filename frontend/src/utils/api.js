// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Call Error:", error);
        throw error;
    }
};

// Users API
export const usersAPI = {
    getAll: () => apiCall("/users"),
    getById: (id) => apiCall(`/users/${id}`),
    create: (userData) =>
        apiCall("/users", {
            method: "POST",
            body: JSON.stringify(userData),
        }),
    update: (id, userData) =>
        apiCall(`/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        }),
    follow: (userId, currentUserId) =>
        apiCall(`/users/${userId}/follow`, {
            method: "POST",
            body: JSON.stringify({ currentUserId }),
        }),
    unfollow: (userId, currentUserId) =>
        apiCall(`/users/${userId}/unfollow`, {
            method: "POST",
            body: JSON.stringify({ currentUserId }),
        }),
};

// Tweets API
export const tweetsAPI = {
    getAll: () => apiCall("/tweets"),
    getById: (id) => apiCall(`/tweets/${id}`),
    create: (tweetData) =>
        apiCall("/tweets", {
            method: "POST",
            body: JSON.stringify(tweetData),
        }),
    delete: (id) =>
        apiCall(`/tweets/${id}`, {
            method: "DELETE",
        }),
    like: (id, userId) =>
        apiCall(`/tweets/${id}/like`, {
            method: "PUT",
            body: JSON.stringify({ userId }),
        }),
    retweet: (id, userId) =>
        apiCall(`/tweets/${id}/retweet`, {
            method: "PUT",
            body: JSON.stringify({ userId }),
        }),
    bookmark: (id, userId) =>
        apiCall(`/tweets/${id}/bookmark`, {
            method: "PUT",
            body: JSON.stringify({ userId }),
        }),
};
