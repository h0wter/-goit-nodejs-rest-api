import { Contact } from "../../models/contacts.js";
import { RequestError } from "../../helpers/RequestError.js";

export const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOneAndRemove({
    _id: id,
    owner: req.user._id,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: result });
};
