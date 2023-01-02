import express from "express";
import { createTweet, deleteTweet, getTweetList, updateTweet } from "./tweet.controller";

const tweetRouter = express.Router();

tweetRouter.get("/", getTweetList);
tweetRouter.post("/", createTweet);
tweetRouter.delete("/:id", deleteTweet);
tweetRouter.put("/", updateTweet);

export default tweetRouter;