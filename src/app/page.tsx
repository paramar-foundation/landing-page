import { NavigationBar } from "./_components/NavigationBar";
import styles from "./layout.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavigationBar />
      <h1 className="m-10">🚧 Work in Progress 🚧</h1>
    </main>
  );
}
