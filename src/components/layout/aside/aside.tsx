import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { RegisterForm } from "@/features/auth";
import { Connect } from "@/features/connect";
import { Search } from "@/features/search";
import { Trends } from "@/features/trends";

import styles from "./styles/aside.module.scss";

export const Aside = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <aside className={styles.container}>
      {session && (
        <>
          {pathname !== "/" && pathname !== "/explore" && (
            <div className={styles.search}>
              <Search />
            </div>
          )}
          {pathname !== "/" && pathname !== "/explore" && (
            <div className={styles.trends}>
              <Trends />
            </div>
          )}
          <div className={styles.connect}>
            <Connect />
          </div>
        </>
      )}
      {!session && (
        <div className={styles.registerForm}>
          <RegisterForm />
        </div>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </aside>
  );
};
