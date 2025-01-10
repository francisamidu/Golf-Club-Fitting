import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { adminRoute, authRoute, consumerRoute } from "./routes";
import {
  adminMiddleware,
  authenticate,
  consumerMiddleware,
} from "./middlewares";

dotenv.config();

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET,HEAD,OPTIONS,POST,PUT"],
  })
);

mongoose.connect(process.env.MONGO_URI || "");

app.use("/auth", authRoute);
app.use("/consumer", authenticate, consumerMiddleware, consumerRoute);
app.use("/admin", authenticate, adminMiddleware, adminRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
