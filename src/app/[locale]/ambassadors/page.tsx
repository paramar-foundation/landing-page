import { Footer } from "../_components/Footer";
import { NavigationBar } from "../_components/NavigationBar";
import { PageSection } from "../_components/PageSection";
import { Contact } from "../_components/PageSection/Contact";

import styles from "../layout.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavigationBar light />
      <PageSection>
        <div
          style={{
            display: "flex",
            height: "100vh",
            color: "black",
            alignItems: "center",
          }}
        >
          <h1>🚧 Ambassadors 🚧</h1>
        </div>
      </PageSection>
      <PageSection bgDefaultColor="#1c1d20">
        <Contact />
      </PageSection>
      <Footer />
    </main>
  );
}
