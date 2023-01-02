import { getTweets, toggleTweet } from "../firebase/database";
import { tweetItem } from "../twitter/tweet";

const TweetForMe = () => {
  console.log("Tweeting for me");
  const nowTime = Math.round(new Date().getTime() / 1000);
  
  getTweets().then((data) => {
    data.forEach(twask => {
      if (twask.timestamp.seconds <= nowTime && !twask.isTweeted) {
        tweetItem(twask.text).then(() => {
          toggleTweet(twask.id);
        });
      }
    });
    
  });
}

export default TweetForMe;