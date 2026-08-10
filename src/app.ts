import express from "express";
import cors from "cors";
import reviewRouter from "./services/service-router";
// import reviewRouter from "./services/service-route";

const app = express();

app.use(cors());
app.use(express.json());

// Register Review Router
app.use("/api/reviews", reviewRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});