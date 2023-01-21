import { useEffect, useState } from "react";
import axios from "axios";
import DateTimePicker from "./datetime-picker";
import { tweet, user } from "./types";
import TweetBox from "./components/tweetbox";

function App() {
  const [tweets, setTweets] = useState<tweet[]>([]);
  const [user, setUser] = useState<user | null>(null);
  const [timedate, setTimedate] = useState(new Date());
  const [text, setText] = useState("");

  useEffect(() => {
    axios.all([axios.get("/v1/users"), axios.get("/v1/tweets")]).then(
      axios.spread((user, tweets) => {
        setUser(user.data.user);
        const TweetData = tweets.data.items as tweet[];

        const SortedTweetData = TweetData.sort((itemA, itemB) => itemB.timestamp.seconds - itemA.timestamp.seconds)
        setTweets(SortedTweetData);
      })
    );
  }, []);

  const addTweet = () => {
    axios
      .post("/v1/tweets", {
        text,
        timestamp: Math.round(timedate.getTime() / 1000),
      })
      .then((result) => {
        console.log(result);

        axios.get("/v1/tweets").then((tweets) => {
          const TweetData = tweets.data.items as tweet[];

          const SortedTweetData = TweetData.sort((itemA, itemB) => itemB.timestamp.seconds - itemA.timestamp.seconds)
          setTweets(SortedTweetData);setTweets(tweets.data.items);
        });
      });
  };

  const deleteTweet = (id: string) => {
    axios.delete(`/v1/tweets/${id}`).then((res) => {
      console.log(res);

      setTweets(tweets.filter((tweet) => tweet.id !== res.data.item));
    });
  };

  return (
      <div className="bg-gray-900 w-screen min-h-screen pb-16 flex items-center flex-col xl:px-[300px]">
        <p className="text-5xl p-8 text-sky-100">QuakerMan</p>
        <div className="container bg-gray-600 xl:mx-[300px] h-full flex items-center flex-col pb-16 rounded-xl">
          <div className="relative w-full flex items-center flex-col md:flex-row justify-center gap-2 px-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-2 text-lg w-full my-4 rounded-xl bg-gray-400 outline-none"
            />
            <div className="flex flex-row gap-2">
              <div className="p-2 text-lg  my-4 rounded-xl bg-gray-400">
                <DateTimePicker onChange={(date) => setTimedate(date)} />
              </div>
              <button
                onClick={() => addTweet()}
                className="p-2 text-lg my-4 px-8 w-full rounded-xl bg-gray-400 text-sky-100 tracking-wide uppercase font-bold"
                >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full text-sky-100">
            <div className="flex flex-1 flex-col items-center">
              <p>Scheduled</p>
              <div className="flex flex-col items-center gap-1 w-full px-8 lg:px-14">
                {tweets.reverse().map(
                  (tweet, i) =>
                    (!tweet.isTweeted && user) && (
                      <TweetBox
                        key={`sch-${i}`}
                        onClick={deleteTweet}
                        tweet={tweet}
                        user={user}
                      />
                    )
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center">
              <p>Done</p>
              <div className="flex flex-col items-center gap-1 w-full px-8 lg:px-14">
                {tweets.map(
                  (tweet, i) =>
                    (tweet.isTweeted && user) && (
                      <TweetBox
                        onClick={(id) => {
                          console.log(id);
                        }}
                        key={`done-${i}`}
                        tweet={tweet}
                        user={user}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
