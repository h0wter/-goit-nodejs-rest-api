import express from "express";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { contactsRouter } from "./routes/api/contacts.js";
import { authRouter } from "./routes/api/auth.js";
import { authenticate } from "./middlewares/authenticate.js";
dotenv.config();

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", authenticate, contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
