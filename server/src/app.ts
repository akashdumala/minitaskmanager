import express from "express";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Mini Task Manager API Running...");
});

// Routes
app.use("/api/tasks", taskRoutes);

// Error Handler
app.use(errorHandler);

export default app;