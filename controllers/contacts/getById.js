import { Contact } from "../../models/contacts.js";

export const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  res.json(result);
};
