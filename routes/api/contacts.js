import express from "express";
import { add } from "../../controllers/contacts/add.js";
import { deleteById } from "../../controllers/contacts/deleteById.js";
import { getAll } from "../../controllers/contacts/getAll.js";
import { getById } from "../../controllers/contacts/getById.js";
import { updateById } from "../../controllers/contacts/updateById.js";
import { updateStatusContact } from "../../controllers/contacts/updateStatusContact.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { isValidId } from "../../middlewares/isValidId.js";
import { validationBody } from "../../middlewares/validationBody.js";
import {
  addContactSchema,
  updateStatusContactSchema,
} from "../../models/contacts.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAll));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getById));

contactsRouter.post("/", validationBody(addContactSchema), ctrlWrapper(add));

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validationBody(updateStatusContactSchema),
  ctrlWrapper(updateStatusContact)
);

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteById));

contactsRouter.put(
  "/:id",
  isValidId,
  validationBody(addContactSchema),
  ctrlWrapper(updateById)
);
