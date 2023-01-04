import express from "express";
import { getUserDetails } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/", getUserDetails);

export default userRouter;