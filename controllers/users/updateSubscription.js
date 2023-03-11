import { RequestError } from "../../helpers/RequestError.js";
import { User } from "../../models/users.js";

export const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(
    id,
    {
      subscription: req.body.subscription,
    },
    { new: true }
  );
  if (!result) throw RequestError(404, "Not found");
  res.json("success");
};
