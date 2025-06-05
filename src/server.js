import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectMongo from "./config/mongo.js";
import chapterRoutes from "./routes/chapter.routes.js";
import limiter from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1/chapters", chapterRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Something went wrong" });
});

connectMongo();
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
