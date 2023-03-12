import express from "express";
import {
  register,
  login,
  logout,
  current,
  updateSubscription,
} from "../../controllers/users/index.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { isValidId } from "../../middlewares/isValidId.js";
import { validationBody } from "../../middlewares/validationBody.js";
import {
  loginSchema,
  registerSchema,
  updateSubscriptionSchema,
} from "../../models/users.js";

export const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validationBody(registerSchema),
  ctrlWrapper(register)
);
usersRouter.post("/login", validationBody(loginSchema), ctrlWrapper(login));
usersRouter.post("/logout", authenticate, ctrlWrapper(logout));
usersRouter.post("/current", authenticate, ctrlWrapper(current));
usersRouter.patch(
  "/",
  authenticate,
  validationBody(updateSubscriptionSchema),
  ctrlWrapper(updateSubscription)
);
