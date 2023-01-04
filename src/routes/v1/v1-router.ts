import express from "express";
import tweetRouter from "./tweet/tweet.route";
import userRouter from "./user/user.route";

const v1_api = express.Router();

v1_api.use('/tweets', tweetRouter);
v1_api.use('/users', userRouter);

export default v1_api;