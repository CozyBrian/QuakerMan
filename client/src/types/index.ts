export interface tweet {
  id: string;
  text: string;
  timestamp: { seconds: number; nanoseconds: number };
  isTweeted: boolean;
}

export interface user {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}
