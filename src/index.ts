require('dotenv').config();
import http from "http";
import app from "./app";
import cron from "node-cron";
import TweetForMe from "./cron";
import { getCurrentUser } from "./twitter/tweet";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

function startServer() {
  server.listen(PORT, () => {
    console.log("Welcome to QuackerMan");
    console.log(`running on port ${PORT}`);
    cron.schedule("* * * * *", TweetForMe);
  });
}

startServer();
