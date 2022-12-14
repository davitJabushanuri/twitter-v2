/* eslint-disable @next/next/no-img-element */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useDisableBodyScroll } from "@/hooks";
import { useEditProfile } from "@/stores/use-edit-profile";

import { updateProfile } from "../api/update-profile";
import { CameraIcon } from "../assets/camera-icon";
import { IProfile, IUser } from "../types";

import styles from "./styles/edit-profile-modal.module.scss";

export const EditProfileModal = ({ user }: { user: IUser }) => {
  useDisableBodyScroll();

  const closeEditProfileModal = useEditProfile(
    (state) => state.closeEditProfileModal,
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ profile, userId }: { profile: IProfile; userId: string }) => {
      return updateProfile(profile, userId);
    },

    {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        closeEditProfileModal();
        queryClient.invalidateQueries(["users", user?.id]);
      },
    },
  );

  const [profile, setProfile] = useState<IProfile>({
    name: user?.name || "",
    bio: user?.description || "",
    location: user?.location || "",
    website: user?.url || "",
    banner: {
      url: user?.profile_banner_url || "",
      file: undefined,
    },
    avatar: { url: user?.profile_image_url || "", file: undefined },
  });

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const chooseImage = async (event: any, type: string) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "banner" && bannerInputRef.current)
      bannerInputRef.current.value = "";

    if (type === "avatar" && avatarInputRef.current)
      avatarInputRef.current.value = "";

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        [type]: { url: reader.result as string, file },
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button
            onClick={() => closeEditProfileModal()}
            className={styles.close}
          >
            <span className={styles.arrow}>
              <BackArrowIcon />
            </span>
            <span className={styles.x}>
              <CloseIcon />
            </span>
          </button>

          <h2>Edit Profile</h2>

          <button
            onClick={() => mutation.mutate({ profile, userId: user.id })}
            disabled={profile?.name.length === 0}
            className={styles.save}
          >
            Save
          </button>
        </div>

        <div className={styles.banner}>
          {profile?.banner?.file ? (
            <img src={profile?.banner?.url} alt="banner" />
          ) : (
            user?.profile_banner_url && (
              <img src={user.profile_banner_url} alt="banner" />
            )
          )}

          <input
            className={styles.bannerInput}
            type="file"
            accept="image/*"
            ref={bannerInputRef}
            onChange={(e) => chooseImage(e, "banner")}
          />
          <button
            onClick={() => bannerInputRef.current?.click()}
            className={styles.chooseBanner}
          >
            <CameraIcon />
          </button>
        </div>

        <div className={styles.avatar}>
          {profile?.avatar.file ? (
            <img src={profile?.avatar?.url} alt="avatar" />
          ) : user?.profile_image_url ? (
            <img src={user.profile_image_url} alt="avatar" />
          ) : (
            <img src="/user_placeholder.png" alt="" />
          )}

          <input
            className={styles.avatarInput}
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            onChange={(e) => chooseImage(e, "avatar")}
          />

          <button
            onClick={() => avatarInputRef?.current?.click()}
            className={styles.chooseAvatar}
          >
            <CameraIcon />
          </button>
        </div>

        <div className={styles.form}>
          <Input label="name" value={profile.name} setProfile={setProfile} />
          <Input label="bio" value={profile.bio} setProfile={setProfile} />
          <Input
            label="location"
            value={profile.location}
            setProfile={setProfile}
          />
          <Input
            label="website"
            value={profile.website}
            setProfile={setProfile}
          />
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  setProfile,
}: {
  label: string;
  value: string | undefined;
  setProfile: (value: string | any) => void;
}) => {
  return (
    <div className={styles.input}>
      <label
        htmlFor={label}
        className={
          label === "name" && value?.length === 0 ? styles.isError : ""
        }
      >
        <input
          type="text"
          name={label}
          id={label}
          placeholder="Name"
          value={value}
          onChange={(e) =>
            setProfile((prev: IProfile) => ({
              ...prev,
              [label]: e.target.value,
            }))
          }
        />
        <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
      </label>
      {label === "name" && value?.length === 0 && (
        <span className={styles.error}>Name can&apos;t be blank</span>
      )}
    </div>
  );
};
