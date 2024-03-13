import axios from "axios";
import { Request, Response } from "express";

export const Home = async (req: Request, res: Response) => {
  // axios.get("https://jsonplaceholder.typicode.com/posts").then((data) => {
  //   console.log(data);
  // });
  res.send("Welcome!");
};
