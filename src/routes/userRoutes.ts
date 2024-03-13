import express, { Request, Response } from "express";
import { Home } from "../controller/userController";
import { userAuth } from "../middlewares/userAuth";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(301).redirect("/dashboard");
});
router.get("/dashboard", userAuth, Home);
// router.get("/dashboard", Home);

export default router;
