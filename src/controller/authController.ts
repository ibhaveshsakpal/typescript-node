import { Request, Response } from "express";
import UserModel, { UserDocument } from "../model/User";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const UserSignUp = async (req: Request, res: Response) => {
  const { username, email, password } = req?.body as UserDocument;
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashPass,
    });

    await newUser.save();

    res
      .status(200)
      .send({ message: "Registered user successfully", data: newUser });
  } catch (error: any) {
    res.status(404).send({ error: error.message });
  }
};

export const UserLogin = async (req: Request, res: Response) => {
  const { email, password } = req?.body as UserDocument;

  try {
    const currentUser: UserDocument | null = await UserModel.findOne({
      email: email,
    });

    if (currentUser) {
      bcrypt.compare(password, currentUser?.password).then((isValid) => {
        if (isValid) {
          const payload = {
            id: currentUser._id,
            username: currentUser.username,
          };
          jsonwebtoken.sign(
            payload,
            process.env.JWT_SECRET!,
            { expiresIn: "300s" },
            (err, token) => {
              if (err) return res.send({ message: err });
              res.send({
                id: currentUser._id,
                message: "Logged In Successfully",
                token: `Bearer ${token}`,
              });
            }
          );
        } else {
          res.send({ message: "Password is incorrect" });
        }
      });
    }
  } catch (error) {
    res.status(404).send({ message: "Invalid username or password" });
  }
};
