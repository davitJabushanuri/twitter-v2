import { Gear } from "@/assets/gear-icon";
import { NewMessageIcon } from "@/assets/new-message-icon";
import { HamburgerButton } from "@/components/elements/hamburger-button";

import styles from "./styles/messages-header.module.scss";

export const MessagesHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />

      <h2 className={styles.title}>Messages</h2>
      <div className={styles.buttons}>
        <button className={styles.options}>
          <Gear />
        </button>

        <button className={styles.newMessage}>
          <NewMessageIcon />
        </button>
      </div>
    </div>
  );
};
