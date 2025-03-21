require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5001;
const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5002/recommend_jobs"; // Flask API endpoint

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Route to get job recommendations
app.post("/api/recommend_jobs", async (req, res) => {
    try {
        const { disability, skills, work_mode, location } = req.body;

        // Input validation
        if (!disability || !skills || !work_mode || !location) {
            return res.status(400).json({ error: "Missing required fields in request body" });
        }

        console.log("Received request with data:", { disability, skills, work_mode, location });

        // Send data to Flask API
        const response = await axios.post(FLASK_API_URL, {
            disability,
            skills,
            work_mode,
            location
        });

        console.log("Flask API response:", response.data);

        // Send response to frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error calling Flask API:", error.message);
        if (error.response) {
            console.error("Flask API response error:", error.response.data);
        }
        res.status(500).json({ error: "Failed to fetch job recommendations" });
    }
});

// Default route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});