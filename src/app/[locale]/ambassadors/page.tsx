import {
  Contact,
  Footer,
  Main,
  NavigationBar,
  PageSection,
} from "../components";

export default function Home() {
  return (
    <Main>
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
    </Main>
  );
}
