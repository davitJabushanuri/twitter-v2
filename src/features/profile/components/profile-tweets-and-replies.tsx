"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Tweet } from "@/features/tweets";

import { useUser } from "../hooks/useUser";

import styles from "./styles/profile-tweets-and-replies.module.scss";

export const ProfileTweetsAndReplies = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const { data: user, isLoading, isError, isSuccess } = useUser(id);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <TryAgain />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isSuccess &&
        user?.tweets?.filter((tweet) => tweet?.in_reply_to_status_id)
          ?.length === 0 && (
          <div className={styles.noTweets}>
            {user?.id === session?.user?.id ? (
              <div>
                <h1>You haven&apos;t tweeted anything yet.</h1>
                <p>When you do, it&apos;ll show up here.</p>
              </div>
            ) : (
              <div>
                <h1>
                  @{user?.email?.split("@")[0]} hasn&apos;t tweeted anything
                  yet.
                </h1>
                <p>When they do, it&apos;ll show up here.</p>
              </div>
            )}
          </div>
        )}

      {isSuccess && user?.tweets?.length > 0 && (
        <div className={styles.tweets}>
          {user?.tweets
            ?.filter((tweet) => {
              return (
                tweet?.in_reply_to_status_id ||
                tweet?.in_reply_to_user_id ||
                tweet?.in_reply_to_screen_name ||
                tweet?.quoted_status_id
              );
            })
            .map((tweet) => {
              return <Tweet key={tweet.id} tweet={tweet} />;
            })}
        </div>
      )}
    </div>
  );
};
