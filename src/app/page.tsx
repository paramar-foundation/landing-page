import { Footer } from "./_components/Footer";
import { NavigationBar } from "./_components/NavigationBar";
import { PageSection } from "./_components/PageSection";
import { AboutUs } from "./_components/PageSection/AboutUs";
import { Hero } from "./_components/PageSection/Hero";
import { Mission } from "./_components/PageSection/Mission";

import styles from "./layout.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavigationBar />
      <PageSection>
        <Hero />
      </PageSection>
      <PageSection>
        <Mission />
      </PageSection>
      <PageSection>
        <AboutUs />
      </PageSection>
      <PageSection>
        <h1 className={styles.wip}>🚧 Work in Progress 🚧</h1>
      </PageSection>
      <Footer />
    </main>
  );
}
