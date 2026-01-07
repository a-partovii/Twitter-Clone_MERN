import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/tweetRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);

// Root route - API info
app.get("/", (req, res) => {
    res.json({
        message: "Twitter Clone API Server",
        status: "Running",
        endpoints: {
            health: "/api/health",
            users: "/api/users",
            tweets: "/api/tweets",
        },
        note: "This is the API server. Run the frontend with: cd frontend && npm run dev",
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Using JSON file storage (database/users.json & database/tweets.json)");
    console.log("Data will not reset after server shutdown");
});
