import { Footer } from "./_components/Footer";
import { NavigationBar } from "./_components/NavigationBar";
import { PageSection } from "./_components/PageSection";
import { AboutUs } from "./_components/PageSection/AboutUs";
import { FAQs } from "./_components/PageSection/FAQs";
import { Goals } from "./_components/PageSection/Goals";
import { Hero } from "./_components/PageSection/Hero";
import { Mission } from "./_components/PageSection/Mission";
import { Numbers } from "./_components/PageSection/Numbers";
import { Professionals } from "./_components/PageSection/Professionals/";

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
        <h1 className={styles.wip}>🚧 Ambassadors [WIP] 🚧</h1>
      </PageSection>
      <PageSection>
        <Numbers />
      </PageSection>
      <PageSection>
        <Goals />
      </PageSection>
      <PageSection>
        <h1 className={styles.wip}>🚧 Why Us [WIP] 🚧</h1>
      </PageSection>
      <PageSection>
        <h1 className={styles.wip}>🚧 Therapy [WIP] 🚧</h1>
      </PageSection>
      <PageSection>
        <Professionals />
      </PageSection>
      <PageSection>
        <h1 className={styles.wip}>🚧 Contact [WIP] 🚧</h1>
      </PageSection>
      <PageSection>
        <h1 className={styles.wip}>🚧 Donate Now [WIP] 🚧</h1>
      </PageSection>
      <PageSection>
        <FAQs />
      </PageSection>
      <Footer />
    </main>
  );
}
