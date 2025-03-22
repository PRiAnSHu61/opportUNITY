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
        const { disabilities, skills, jobType, location, salary } = req.body;

        // Input validation
        if (!disabilities?.length || !skills?.length || !jobType?.length || !location?.length) {
            return res.status(400).json({ error: "Missing required fields in request body" });
        }

        console.log("Received request with data:", { disabilities, skills, jobType, location, salary });

        // Flatten or choose primary values
        const disability = disabilities[0]; // Select first disability
        const work_mode = jobType.includes("On-Site") ? "On-Site" : "Remote"; // Set work mode
        const job_location = location.join(", "); // Join locations into a string

        // Send data to Flask API
        const response = await axios.post(FLASK_API_URL, {
            disability,
            skills,
            work_mode,
            location: job_location
        });

        console.log("Flask API response:", response.data);
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