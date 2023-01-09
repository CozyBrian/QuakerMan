import React, { useRef, useState } from "react";
import { tweet, user } from "../types";
import ThreeDots from "../assets/three-dots.png";
import Delete from "../assets/delete.png";
import { format } from "date-fns";
import useMouseOverCallback from "../hooks/useMouseOverCallback";

interface TweetBoxProps {
  tweet: tweet;
  user: user;
  onClick: (id: string) => void;
}

const TweetBox = ({ tweet, user, onClick }: TweetBoxProps) => {
  const TweetBoxRef = useRef(null);
  const tweetDate = new Date(tweet.timestamp.seconds * 1000);
  const [showMenu, setShowMenu] = useState(false);

  useMouseOverCallback(TweetBoxRef, () => {
    setShowMenu(false);
  });

  return (
    <div
      ref={TweetBoxRef}
      className="relative flex flex-col w-[300px] min-h-[100px] min-w-[300px] p-3 gap-3 text-black bg-white"
    >
      <div className="flex flex-row items-center gap-2">
        <div>
          <div className="w-12 h-12 bg-gray-400 rounded-full flex shrink-0">
            <img
              className="w-full h-full rounded-full"
              src={user.profile_image_url}
              alt="profile"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-600 mt-0">@{user.username}</p>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-5 h-5 p-1 rounded-full hover:bg-slate-200 cursor-pointer"
          >
            <img className="w-full h-full" src={ThreeDots} alt="icon" />
          </button>
        </div>
      </div>
      <div>
        <p>{tweet.text}</p>
      </div>
      <div className="text-xs text-gray-500">
        <span>{format(tweetDate, "h:mm a")}</span>
        &nbsp;&middot;&nbsp;
        <span>{format(tweetDate, "dd/MM/yyyy")}</span>
      </div>
      {showMenu && (
        <div className="absolute -right-11 top-2 w-10 flex p-1 bg-white rounded">
          <button
            onClick={() => {
              onClick(tweet.id);
              setShowMenu(false);
            }}
            className="w-full h-full rounded-md hover:bg-slate-200 p-1"
          >
            <img className="w-full h-full" src={Delete} alt="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TweetBox;
