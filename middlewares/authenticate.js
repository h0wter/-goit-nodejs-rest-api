import jwt from "jsonwebtoken";
import { RequestError } from "../helpers/RequestError.js";
import { User } from "../models/users.js";

const { SECRET_KEY } = process.env;

export const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(RequestError(401, "Not authorized"));
  try {
    jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user) next(RequestError(401, "Not authorized"));
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};
