import FirebaseApp from ".";
import { getFirestore, collection, getDocs, doc, addDoc, deleteDoc, Timestamp, updateDoc } from "firebase/firestore";
import { Tweet } from "../types";

const db = getFirestore(FirebaseApp);

const tweetsCol = collection(db, 'QuakerMan');

export const getTweets = async () => {
  const querySnapshot = await getDocs(tweetsCol);
  let QueryArray: Tweet[] = [];
  querySnapshot.forEach((doc) => {
    const item = doc.data() as Tweet;
    QueryArray.push({ ...item, id: doc.id });
  });
  return QueryArray;
};

export const EditTweet = async (tweet: Tweet) => {
  return await updateDoc(doc(tweetsCol, "/" + tweet.id), { ...tweet });
}

export const addTweet = async (tweet: Tweet) => {
  const date = new Date(tweet.timestamp.seconds * 1000);

  return await addDoc(tweetsCol, {...tweet, timestamp: Timestamp.fromDate(date)});
}

export const deleteTweet = async (id: string) => {
  return await deleteDoc(doc(tweetsCol, "/" + id));
}

export const toggleTweet = async (id: string) => {
  return await updateDoc(doc(tweetsCol, "/" + id), { isTweeted: true });
}