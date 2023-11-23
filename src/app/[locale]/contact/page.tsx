"use client";

import {
  Contact,
  Footer,
  Main,
  NavigationBar,
  PageSection,
} from "../components";

import styles from "./contact.module.scss";

export default function Ambassadors() {
  return (
    <Main>
      <NavigationBar scrollThreshold={10} />
      <div className={styles.spacer}></div>
      <PageSection id="contact" bgDefaultColor="#1c1d20" isLastSection>
        <Contact />
      </PageSection>
      <Footer />
    </Main>
  );
}
