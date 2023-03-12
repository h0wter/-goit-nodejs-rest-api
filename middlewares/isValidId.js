import { isValidObjectId } from "mongoose";
import { RequestError } from "../helpers/RequestError.js";

export const isValidId = (req, _, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);

  if (!isCorrectId) {
    const error = RequestError(400, `${id} is not correct id format`);
    next(error);
  }
  next();
};
