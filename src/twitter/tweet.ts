import rwClient from ".";

export const tweetItem = async (text: string) => {
  try {
    const tweetme = await rwClient.v2.tweet(text);
    console.log(tweetme.data);
  } catch (error) {
    console.log(error);
  }
}
