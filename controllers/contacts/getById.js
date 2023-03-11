import { Contact } from "../../models/contacts.js";

export const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  res.json(result);
};
