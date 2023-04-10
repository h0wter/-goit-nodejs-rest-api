import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestError } from "../../helpers/RequestError.js";
import { User } from "../../models/users.js";

const { SECRET_KEY } = process.env;

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw RequestError(401, "Email or password is wrong");
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw RequestError(401, "Email or password is wrong");
  if (!user.verify) throw RequestError(401, "Email not verified");
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
