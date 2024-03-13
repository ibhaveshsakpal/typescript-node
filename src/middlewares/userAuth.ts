import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers &&
    req.headers.token &&
    typeof req.headers.token === "string"
  ) {
    const token = req.headers.token?.split(" ")[1];

    if (token) {
      jsonwebtoken.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          res.json({ isLoggedin: false, message: "Token is invalid" });
        }
        if (decoded) {
          next();
        }
      });
    }
  } else {
    res.send({ isLoggedin: false, message: "Invalid token provided" });
  }
};
