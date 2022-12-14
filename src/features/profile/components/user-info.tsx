/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

import { DotIcon } from "@/assets/dot-icon";
import { LocationIcon } from "@/assets/location-icon";
import { MessageIcon } from "@/assets/message-icon";
import {
  ReceivingNotificationsIcon,
  ReceiveNotificationsIcon,
} from "@/assets/notifications-icon";
import { useEditProfile } from "@/stores/use-edit-profile";
import { useInspectImage } from "@/stores/use-inspect-profile-image";

import { toggleFollow } from "../api/toggle-follow";
import { CalendarIcon } from "../assets/calendar-icon";
import { WebsiteIcon } from "../assets/website-icon";
import { IUser } from "../types";

import styles from "./styles/user-info.module.scss";

export const UserInfo = ({ user }: { user: IUser }) => {
  const { data: session } = useSession();
  const isFollowing = user?.followers.find(
    (follower) => follower?.follower_id === session?.user?.id,
  );
  const openEditProfileModal = useEditProfile(
    (state) => state.openEditProfileModal,
  );

  const openInspectModal = useInspectImage((state) => state.openInspectModal);
  const setSource = useInspectImage((state) => state.setSource);
  const setSourceType = useInspectImage((state) => state.setSourceType);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ followerId, userId }: { followerId: string; userId: string }) => {
      return toggleFollow(followerId, userId);
    },

    {
      onSuccess: () => {
        console.log("success");
      },

      onError: () => {
        console.log("error");
      },

      onSettled: () => {
        queryClient.invalidateQueries(["users", user?.id]);
      },
    },
  );

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {user?.profile_banner_url && (
          <img
            onClick={() => {
              setSource(user?.profile_banner_url || "");
              setSourceType("banner");
              openInspectModal();
            }}
            src={user?.profile_banner_url}
            alt=""
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          {user?.profile_image_url ? (
            <img
              onClick={() => {
                setSource(user?.profile_image_url || "");
                setSourceType("avatar");
                openInspectModal();
              }}
              src={user?.profile_image_url}
              alt=""
            />
          ) : (
            <img src="/user_placeholder.png" alt="" />
          )}
        </div>

        <div className={styles.editProfile}>
          {session?.user?.id === user?.id ? (
            <button
              onClick={() => openEditProfileModal()}
              className={styles.editProfile}
            >
              Edit Profile
            </button>
          ) : (
            <div className={styles.visitorActions}>
              <button className={styles.options}>
                <DotIcon />
              </button>
              <button className={styles.message}>
                <MessageIcon />
              </button>
              <button className={styles.notifications}>
                <ReceiveNotificationsIcon />
              </button>

              <button
                onClick={() =>
                  mutation.mutate({
                    followerId: session?.user?.id || "",
                    userId: user?.id || "",
                  })
                }
                className={isFollowing ? styles.following : styles.follow}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          )}
        </div>

        <div className={styles.user}>
          <div className={styles.name}>
            <h1>{user?.name}</h1>
            <p>@{user?.username ?? user?.email?.split("@")[0]}</p>
          </div>

          {user?.description && (
            <div className={styles.bio}>
              <p>{user?.description}</p>
            </div>
          )}

          <div className={styles.locationAndJoined}>
            {user?.location && (
              <div className={styles.location}>
                <span className={styles.icon}>
                  <LocationIcon />
                </span>
                <span className={styles.text}>{user?.location}</span>
              </div>
            )}

            {user?.url && (
              <div className={styles.website}>
                <span className={styles.icon}>
                  <WebsiteIcon />
                </span>
                <span className={styles.text}>
                  <a href={`${user?.url}`}>{user?.url}</a>
                </span>
              </div>
            )}

            {user?.created_at && (
              <div className={styles.joined}>
                <span className={styles.icon}>
                  <CalendarIcon />
                </span>
                <span className={styles.text}>
                  Joined {dayjs(user?.created_at).format("MMMM YYYY")}
                </span>
              </div>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.number}>{user?.friends_count}</span>
              <span className={styles.text}>Following</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>{user?.followers_count}</span>
              <span className={styles.text}>Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
