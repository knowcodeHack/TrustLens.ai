import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import ingestRoutes from "./routes/ingest";
import alertRoutes from "./routes/alerts";
import { connectRedis } from "./redis";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/ingest", ingestRoutes);
app.use("/api/alerts", alertRoutes);

const start = async () => {
  try {
    await connectRedis();
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }

  app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
  });
};

start();
