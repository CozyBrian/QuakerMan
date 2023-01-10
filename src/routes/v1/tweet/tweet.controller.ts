import { Request, Response } from "express";
import { addTweet, getTweets, deleteTweet as delTweet, EditTweet } from "../../../firebase/database";
const nanoid = require('nanoid');

export const createTweet = (req: Request, res: Response) => {
  const text = req.body.text as string;
  const timestamp = req.body.timestamp;
  const tweet = {
    id: nanoid(),
    text,
    timestamp: { seconds: timestamp, nanoseconds: 0 },
    isTweeted: false,
  };

  if (text.length > 280) { 
    res.status(400).send({ error: "text is too long" });
  }

  addTweet(tweet).then(() => {
    res.send({ item: tweet });
  }).catch((error) => {
    res.status(500).send({ error });
  });
};

export const getTweetList = (req: Request, res: Response) => {
  getTweets().then((tweets) => {
    res.send({ items: tweets });
  });
};

export const deleteTweet = (req: Request, res: Response) => {
  const id = req.params.id;

  if (id === undefined) {
    res.send({ error: "id is undefined" });
  } else {
    delTweet(id!).then(() => {
      res.send({ item: id });
    }).catch((error) => {
      res.status(500).send({ error });
    });
  }
};

export const updateTweet = (req: Request, res: Response) => {
  const tweet = req.body;

  EditTweet(tweet).then(() => {
    res.send({ item: tweet });
  }).catch((error) => {
    res.status(500).send({ error });
  });
}
