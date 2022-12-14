import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { BellActive, Bell } from "../assets/bell-icon";
import { Bookmark, BookmarkActive } from "../assets/bookmark-icon";
import { Envelope, EnvelopeActive } from "../assets/envelope-icon";
import { Gear, GearActive } from "../assets/gear-icon";
import { Hashtag, HashtagActive } from "../assets/hashtag-icon";
import { HomeActive, Home } from "../assets/home-icon";
import { User, UserActive } from "../assets/user-icon";

import NavItem from "./navbar-item";
import styles from "./styles/navbar.module.scss";

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      {session && (
        <NavItem
          icon={pathname === `/home` ? <HomeActive /> : <Home />}
          title={`Home`}
          path={`home`}
          isActive={pathname === `/home`}
        />
      )}

      <NavItem
        icon={pathname === `/explore` ? <HashtagActive /> : <Hashtag />}
        title={`Explore`}
        path={`explore`}
        isActive={pathname === `/explore`}
      />

      {session && (
        <NavItem
          icon={pathname === `/notifications` ? <BellActive /> : <Bell />}
          title={`Notifications`}
          path={`notifications`}
          isActive={pathname === `/notifications`}
        />
      )}

      {session && (
        <NavItem
          icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
          title={`Messages`}
          path={`messages`}
          isActive={pathname === `/messages`}
        />
      )}

      {session && (
        <NavItem
          icon={pathname === `/bookmarks` ? <BookmarkActive /> : <Bookmark />}
          title={`Bookmarks`}
          path={`bookmarks`}
          isActive={pathname === `/bookmarks`}
        />
      )}

      {session && (
        <NavItem
          icon={
            pathname === `/${session?.user?.id}` ? <UserActive /> : <User />
          }
          title={`Profile`}
          path={session?.user?.id}
          isActive={pathname === `/${session?.user?.id}`}
        />
      )}

      <NavItem
        icon={pathname === `/settings` ? <GearActive /> : <Gear />}
        title={`Settings`}
        path={`settings`}
        isActive={pathname === `/settings`}
      />
    </div>
  );
};
