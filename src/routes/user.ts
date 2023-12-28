import express from "express";
import {
  getUserDetail,
} from "../controllers/userAction";

const router = express.Router();

router.post("/getUserDetail", getUserDetail);


export { router as userAction };
