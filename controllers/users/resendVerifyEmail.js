import { User } from "../../models/users.js";
import { sendEmail } from "../../helpers/sendEmail.js";
import { RequestError } from "../../helpers/RequestError.js";

export const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify)
    throw RequestError(400, "Verification has already been passed");
  const msg = {
    to: email,
    subject: "Email confirmation",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
  };
  await sendEmail(msg);
  res.json({ message: "Verificatition email sent" });
};
