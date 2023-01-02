require('dotenv').config();
import rwClient from "./twitter/twitterClient";
import http from "http";
import app from "./app";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const tweet = async () => {
  try {
    const tweetme = await rwClient.v2.tweet("Is this thing really working, again. lol");
    console.log(tweetme.data);
  } catch (error) {
    console.log(error);
  }
}


function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
