import TwitterApi from "twitter-api-v2";

const settings = {
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET_KEY!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
}

const client = new TwitterApi(settings);

const rwClient = client.readWrite;

export default rwClient;