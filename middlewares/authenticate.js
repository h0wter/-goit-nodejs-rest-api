import jwt from "jsonwebtoken";
import { RequestError } from "../helpers/RequestError.js";

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(RequestError(401, "Not authorized"));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    next(RequestError(401, error.message));
  }
  next();
};
