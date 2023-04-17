import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { User } from "../../models/users.js";
import { sendEmail } from "../../helpers/sendEmail.js";
import { RequestError } from "../../helpers/RequestError.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const msg = {
    to: email,
    subject: "Email confirmation",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
  };
  await sendEmail(msg);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};
