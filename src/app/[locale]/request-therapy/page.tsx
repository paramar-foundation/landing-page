"use client";

import {
  Contact,
  Footer,
  Main,
  NavigationBar,
  PageSection,
} from "../components";

import styles from "./request-therapy.module.scss";

export default function RequestTherapyPage() {
  return (
    <Main>
      <NavigationBar scrollThreshold={10} />
      <div className={styles.spacer}></div>
      <PageSection id="contact" bgDefaultColor="#1c1d20" isLastSection>
        <Contact hasSelect={false} pageType="request-therapy" />
      </PageSection>
      <Footer />
    </Main>
  );
}
