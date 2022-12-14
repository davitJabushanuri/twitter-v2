"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { useTweets } from "../hooks/useTweets";

import styles from "./styles/tweets.module.scss";
import { Tweet } from "./tweet";

export const Tweets = () => {
  const { data: tweets, isLoading, isError, isSuccess } = useTweets();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {isSuccess &&
        tweets?.length > 0 &&
        tweets?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
    </div>
  );
};
