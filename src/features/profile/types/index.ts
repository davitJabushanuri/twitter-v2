import { ITweet } from "@/features/tweets";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role: string;
  username?: string;
  screen_name?: string;
  location?: string;
  url?: string;
  description?: string;
  protected?: boolean;
  verified?: boolean;
  followers_count?: number;
  friends_count?: number;
  favorites_count?: number;
  statuses_count?: number;
  profile_banner_url?: string;
  profile_image_url?: string;
  default_profile?: boolean;
  default_profile_image?: boolean;
  created_at: string;
  updated_at: string;
  tweets: ITweet[];
}

export interface IProfile {
  name: string;
  bio: string | undefined;
  location: string | undefined;
  website: string | undefined;
  banner: string | undefined;
  avatar: string | undefined;
}
