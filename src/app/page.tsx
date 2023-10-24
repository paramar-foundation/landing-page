import { Footer } from "./_components/Footer";
import { Hero } from "./_components/Hero";
import { MissionSection } from "./_components/MissionSection";
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
        <MissionSection />
      </PageSection>
      <PageSection>
        <h1 className={styles.wip}>🚧 Work in Progress 🚧</h1>
      </PageSection>
      <Footer />
    </main>
  );
}
