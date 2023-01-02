require('dotenv').config();
import http from "http";
import app from "./app";
// import cron from "node-cron";
import TweetForMe from "./cron";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

function startServer() {
  server.listen(PORT, () => {
    console.log("Welcome to QuackerMan");
    console.log(`running on port ${PORT}`);
    setInterval(TweetForMe, 1000 * 60)
    // cron.schedule("* * * * *", TweetForMe);
  });
}

startServer();
