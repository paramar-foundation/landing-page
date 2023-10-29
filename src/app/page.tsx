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
import { Therapy } from "./_components/PageSection/Therapy";
import { WhyUs } from "./_components/PageSection/WhyUs";

import styles from "./layout.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavigationBar />
      <PageSection bgImage="/bg-hero.jpg" bgDefaultColor="$color-grey-400">
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
      <PageSection bgImage="/bg-numbers.jpg" bgDefaultColor="$color-purple">
        <Numbers />
      </PageSection>
      <PageSection>
        <Goals />
      </PageSection>
      <PageSection
        bgImage="bg-projects-and-therapy.jpg"
        bgDefaultColor="$color-grey-400"
      >
        <>
          <WhyUs />
          <Therapy />
        </>
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
