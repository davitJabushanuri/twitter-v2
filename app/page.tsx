import { CreateTweet } from "@/features/create-tweet";

import styles from "./landingPage.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <CreateTweet />
    </div>
  );
}
