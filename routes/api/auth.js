import express from "express";
import { register } from "../../controllers/auth/register.js";
import { login } from "../../controllers/auth/login.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

export const authRouter = express.Router();

authRouter.post("/register", ctrlWrapper(register));
authRouter.post("/login", ctrlWrapper(login));
