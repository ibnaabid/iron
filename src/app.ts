import express from "express";
import cors from "cors";
import reviewRouter from "./services/service-router";
import workoutRouter from "./routes/workout";

const app = express();

app.use(cors());
app.use(express.json());

// Register Routers
app.use("/api/reviews", reviewRouter);
app.use("/api/workouts", workoutRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});