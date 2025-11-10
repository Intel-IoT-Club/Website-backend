import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Config Imports
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

// Import Models
import Timeline_events from "./models/Timeline_Events.js";

// Import Routes
import eventRoutes from "./routes/eventRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import membersRoutes from "./routes/membersRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
await connectDB();

/* ROUTES */

// Events
app.use("/api/events", eventRoutes);

// Projects
app.use("/api/projects", projectRoutes);

// Members
app.use("/api/members", membersRoutes);

// Timeline Events
app.use("/api/timeline", timelineRoutes);

// Sample route for testing
app.get("/api/timeline_events/get", async (req, res) => {
  try {
    const events = await Timeline_events.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching timeline events", error: err.message });
  }
});

// Start Server
app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running in ${ENV.NODE_ENV} on port ${ENV.PORT}`);
});
