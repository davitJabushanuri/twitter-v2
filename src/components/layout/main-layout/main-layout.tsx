"use client";
import { useSession } from "next-auth/react";

import { LoadingScreen } from "@/components/elements/loading-screen";
import { Aside } from "@/components/layout/aside";
import { AuthModalTrigger } from "@/features/auth";
import { CreateTweetModal } from "@/features/create-tweet";
import { HamburgerMenu, MobileNavbar } from "@/features/navbar";
import { Sidebar, TweetButton, UserModal } from "@/features/sidebar";
import { InspectTweetImageModal } from "@/features/tweets";
import { useAuthModal } from "@/stores/use-auth-modal";
import { useColor } from "@/stores/use-color";
import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";
import { useHamburger } from "@/stores/use-hamburger";
import { useInspectTweetImage } from "@/stores/use-inspect-tweet-images";
import { useTheme } from "@/stores/use-theme";
import NextAuthProvider from "@/utils/next-auth-provider";
import ReactQueryWrapper from "@/utils/react-query";

const MainLayout = ({
  children,
  theme,
  color,
}: {
  children: React.ReactNode;
  theme: string | undefined;
  color: string | undefined;
}) => {
  const currentTheme = useTheme((state) => state.theme);
  const currentColor = useColor((state) => state.color);
  const isTweetModalOpen = useCreateTweetModal((state) => state.isModalOpen);
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);
  const isUserModalOpen = useAuthModal((state) => state.isUserModalOpen);
  const isTweetImageModalOpen = useInspectTweetImage(
    (state) => state.isTweetImageModalOpen,
  );

  const { data: session, status } = useSession();

  return (
    <NextAuthProvider>
      <body className={`${currentTheme || theme} ${currentColor || color}`}>
        {status === "loading" ? (
          <LoadingScreen />
        ) : (
          <>
            <ReactQueryWrapper>
              <div className="layout">
                <MobileNavbar />
                <div className="mobile-tweet-button">
                  <TweetButton />
                </div>
                <Sidebar />
                <main>{children}</main>
                <Aside />
              </div>
              {isTweetModalOpen && <CreateTweetModal />}
              {isHamburgerOpen && <HamburgerMenu />}
              {!session && <AuthModalTrigger />}
              {isUserModalOpen && <UserModal />}
              {isTweetImageModalOpen && <InspectTweetImageModal />}
            </ReactQueryWrapper>
          </>
        )}
      </body>
    </NextAuthProvider>
  );
};

export default MainLayout;
