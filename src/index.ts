import express, { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import blogRoutes from "./routes/blogRoutes";
import mongoose from "mongoose";
import path from "path";
import helmet from "helmet";
require("dotenv").config();

const app = express();
const port = 4000;
const MONGO_URI = process.env.MONGO_URI!;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);

app.use("/", userRoutes);

app.use("/blogs", blogRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "/view/index.html")),
  uploadRoutes
);

app.use("*", (req: Request, res: Response) => {
  res.status(404).send("404 page not found!");
});

mongoose
  .connect(MONGO_URI)
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed! ", err);
  });
