import { Contact } from "../../models/contacts.js";
import { RequestError } from "../../helpers/RequestError.js";

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
