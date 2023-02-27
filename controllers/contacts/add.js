import { Contact } from "../../models/contacts.js";

export const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
