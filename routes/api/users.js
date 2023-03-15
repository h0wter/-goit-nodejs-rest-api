import express from "express";
import {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
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
import { upload } from "../../middlewares/upload.js";

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
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);
