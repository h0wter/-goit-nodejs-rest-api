import { Contact } from "../../models/contacts.js";

export const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite = false } = req.query;

  const favoriteFilter = favorite === "true" ? [true] : [true, false];
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, favorite: { $in: favoriteFilter } },
    { __v: 0 },
    { skip, limit: Number(limit) }
  ).populate("owner", "email");
  res.json(result);
};
