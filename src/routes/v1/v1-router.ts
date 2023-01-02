import express from "express";
import tweetRouter from "./tweet/tweet.route";

const v1_api = express.Router();

v1_api.use('/tweet', tweetRouter);

export default v1_api;