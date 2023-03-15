import multer from "multer";
import path from "path";
import { __dirname } from "../dirname.js";

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: multerConfig });
