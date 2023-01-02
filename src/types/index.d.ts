export interface Tweet {
  id: string;
  text: string;
  timestamp: { seconds: number; nanoseconds: number };
  isTweeted: boolean;
}