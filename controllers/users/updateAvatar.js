import Jimp from "jimp";
import path from "path";
import fs from "fs/promises";
import { User } from "../../models/users.js";
import { __dirname } from "../../dirname.js";

const PORT = process.env.PORT;
const avatarsDir = path.join(__dirname, "public", "avatars");

export const updateAvatar = async (req, res) => {
  const { path: tempFile, filename } = req.file;
  const { _id: id } = req.user;
  const [extension] = filename.split(".").reverse();
  const avatarName = `${id}.${extension}`;
  const resultFile = path.join(avatarsDir, avatarName);
  await fs.rename(tempFile, resultFile);
  const avatar = await Jimp.read(resultFile);
  await avatar.resize(250, 250).write(resultFile);
  const avatarURL = `http://localhost:${PORT}/avatars/${avatarName}`;
  await User.findByIdAndUpdate(id, {
    avatarURL,
  });
  res.json({ avatarURL });
};
