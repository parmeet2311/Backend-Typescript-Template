import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userAuth } from "./routes/auth";
import { userAction } from "./routes/user";
import { adminAction } from "./routes/admin";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  res.send("Hello Developers");
});
app.use("/auth", userAuth);
app.use("/user", userAction);
app.use("/admin", adminAction);




mongoose.connect(
  "" //mongo srv: link
);
app.listen(3003, () => console.log("Server started"));
