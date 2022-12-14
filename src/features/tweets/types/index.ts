import { IUser } from "@/features/profile";

export interface IFeed {
  id: number;
}

export interface ITweet {
  id: string;
  text?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  coordinates?: string;
  favorite_count: number;
  in_reply_to_screen_name?: number;
  in_reply_to_status_id?: number;
  in_reply_to_user_id?: number;
  is_quote_status: boolean;
  lang?: string;
  place_id?: string;
  possibly_sensitive?: boolean;
  quote_count?: number;
  quoted_status_id?: number;
  reply_count?: number;
  retweet_count?: number;
  source?: string;
  author: IUser;
  likes: ILike[];
  media?: IMedia[];
}

export interface ILike {
  id: string;
  user_id: string;
  tweet_id: string;
}

export interface IMedia {
  id: string;
  media_url: string;
  media_type: string;
  tweet_id: string;
}
