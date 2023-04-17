import { User } from "../../models/users.js";
import { RequestError } from "../../helpers/RequestError.js";

export const verifyEmail = async (req, res) => {
  const verificationToken = req.params;
  const user = await User.findOneAndUpdate(verificationToken, {
    verify: true,
    verificationToken: null,
  });
  if (!user) throw RequestError(404, "User not found");
  res.json({ message: "Verification successful" });
};
