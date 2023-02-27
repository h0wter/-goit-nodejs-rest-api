import { Contact } from "../../models/contacts.js";

export const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};
