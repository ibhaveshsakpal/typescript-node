import express, { NextFunction, Request, Response } from "express";
import { UserLogin, UserSignUp } from "../controller/authController";
import { body, validationResult } from "express-validator";
import UserModel from "../model/User";
import { limiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username should be minimum 4 characters")
    .isLength({ max: 12 })
    .withMessage("Username should not exceed 12 characters")
    .custom(async (value) => {
      const existingUser = await UserModel.findOne({ username: value });
      if (existingUser) {
        throw new Error("Username already exists!");
      }
    }),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (value) => {
      const existingEmail = await UserModel.findOne({ email: value });
      if (existingEmail) {
        throw new Error("Email already exists!");
      }
    }),

  body("password")
    .isLength({ min: 4 })
    .withMessage("Password should be minimum 4 characters")
    .isLength({ max: 15 })
    .withMessage("Password should not exceed 15 characters"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    } else {
      next();
    }
  },
  UserSignUp
);

router.post(
  "/login",
  express().use(limiter),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (value) => {
      const existingEmail = await UserModel.findOne({ email: value });
      if (!existingEmail) {
        throw new Error("Email does not exists!");
      }
    }),

  body("password").notEmpty().withMessage("Password is mandatory"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    } else {
      next();
    }
  },
  UserLogin
);

export default router;
