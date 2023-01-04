import rwClient from ".";

export const tweetItem = async (text: string) => {
  try {
    const tweetme = await rwClient.v2.tweet(text);
    console.log(tweetme.data);
  } catch (error) {
    console.log(error);
  }
}

export const getCurrentUser = async () => {
  return (await (rwClient.v2.me({"user.fields": ["profile_image_url"]}))).data;
}