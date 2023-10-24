import { Hero } from "./_components/Hero";
import { NavigationBar } from "./_components/NavigationBar";
import { PageSection } from "./_components/PageSection";

import styles from "./layout.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavigationBar />
      <PageSection>
        <Hero />
      </PageSection>
      <PageSection>
        <h1 className="m-10">🚧 Work in Progress 🚧</h1>
      </PageSection>
    </main>
  );
}
