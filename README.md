# QuakerMan
QuakerMan is a tweet scheduling bot that allows you to schedule tweets in advance. In order to use QuakerMan, you will need to have a Twitter Developer account and a Firebase account. You can apply for a developer account at https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api.

## Getting Started
Make to sure to get your Firebase project credentials from your firebase console and also get Your Twitter Api key, access token and their respective secrets from your twitter api dashboard
Once you have all the necessary information you can put them in a .env file in your repo and the example in the repo will guide you

run to setup
> yarn install && yarn build

run to start the server
> yarn start

QuakerMan uses Firebase Firestore as a database to store the tweets that you have scheduled. The QuakerMan API offers the following endpoints for interacting with your scheduled tweets:

Once you have set up your database, you can use the following endpoints to interact with the QuakerMan API:

- POST v1/tweets/ - This endpoint allows you to create a new tweet and schedule it for a specific time in the future. The request body should include the text of the tweet and the timestamp for when you want it to be sent. and the isTweeted field will be set to false to indicate that the tweet has not yet been sent.
```typescript
{
  interface tweet {
    id: string;
    isTweeted: boolean
    text: string;
    timestamp: { seconds: number, nanoseconds: number }
  }
}
```

- GET v1/tweets/ - This endpoint allows you to retrieve all of the tweets that you have scheduled. It will return an object with an items field containing an array of the tweets.
```typescript
{
  interface RESPONSE {
    items: tweet[];
  }
}
```

- DELETE v1/tweets/:id - This endpoint allows you to delete a specific tweet that you have scheduled. The id of the tweet to be deleted should be passed as a parameter in the URL. If the id is not provided, the endpoint will return an error.

```json
{
  "item": "289732uowuer"
}
```

- PUT v1/tweets/ - This endpoint allows you to update an existing tweet that you have scheduled. The request body should include the updated fields for the tweet.

```json
{
  "item": {
    "id": "289732uowuer",
    "isTweeted": true,
    "text": "Hello World",
    "timestamp": { "seconds": 428209233, "nanoseconds": 0 }
  }
}
```

- GET v1/users/ - This endpoint returns the currently logged in user's details like
```json
{
  "user": {
    "id": "abc123efg456",
    "name": "Twiter dev",
    "username": "twitterdev",
    "profile_image_url": "https://urlofimage.com/path"
  }
}
```

this is pretty rough but functional, So I'm open to contributions????