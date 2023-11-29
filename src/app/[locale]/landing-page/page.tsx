"use client";

import { Footer, Main, NavigationBar } from "../components";
import { Contact, PageSection } from "../components/PageSection";
import {
  AboutUs,
  Ambassadors,
  Projects,
  Goals,
  Hero,
  Mission,
  Numbers,
  Therapy,
  WhyUs,
} from "./components/PageSection";

export default function LandingPage() {
  return (
    <Main>
      <NavigationBar />
      <Hero />
      <PageSection>
        <Mission />
      </PageSection>
      <PageSection>
        <AboutUs />
      </PageSection>
      <PageSection>
        <Ambassadors />
      </PageSection>
      <PageSection bgImage="/bg-numbers.jpg" bgDefaultColor="#6432c8">
        <Numbers />
      </PageSection>
      <PageSection>
        <Goals />
      </PageSection>
      <PageSection
        bgImage="/bg-projects-and-therapy.jpg"
        bgDefaultColor="#494a4d"
      >
        <WhyUs />
        <Therapy />
      </PageSection>
      <PageSection>
        <Projects />
      </PageSection>
      <PageSection bgDefaultColor="#1c1d20">
        <Contact />
      </PageSection>
      <Footer />
    </Main>
  );
}
