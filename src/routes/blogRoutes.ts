import express from "express";
import {
  CreateBlog,
  UpdateBlog,
  CreateComment,
  UpdateComment,
} from "../controller/blogController";
import { userAuth } from "../middlewares/userAuth";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.put("/:id", userAuth, UpdateBlog);
router.post(
  "/",
  body("title").notEmpty().withMessage("Title cannot be empty"),

  body("content").notEmpty().withMessage("Content cannot be empty"),

  body("author")
    .notEmpty()
    .withMessage("Author Id cannot be empty")
    .isMongoId()
    .withMessage("Please provide a valid MongoDb Id for author"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    } else {
      next();
    }
  },
  userAuth,
  CreateBlog
);

router.post("/comments", userAuth, CreateComment);
router.put("/comments/:id", userAuth, UpdateComment);

export default router;
