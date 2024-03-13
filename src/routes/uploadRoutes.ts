import express, { Request, Response } from "express";
import multer from "multer";

const router = express.Router();
// const upload = multer({ dest: "./pubic/uploads/" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/uploads");
  },
  filename: (req, file, cb) => {
    const newName = Date.now();
    const fileExt =
      file.originalname.split(".")[file.originalname?.split(".").length - 1];

    cb(null, newName + "." + fileExt);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/file",
  upload.single("uploaded_file"),
  (req: Request, res: Response) => {
    console.log(req.file);
    res.send("File uploaded!");
  }
);

export default router;
