import { Footer, Main, NavigationBar } from "./components";

export default function NotFoundPage() {
  return (
    <Main>
      <NavigationBar light />
      <div
        style={{
          display: "flex",
          height: "100vh",
          color: "black",
          alignItems: "center",
        }}
      >
        <h1>🚧 404 Page 🚧</h1>
      </div>
      <Footer />
    </Main>
  );
}
