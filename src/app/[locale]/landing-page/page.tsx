"use client";

import { Footer, Main, NavigationBar } from "../components";
import { Contact, PageSection } from "../components/PageSection";
import {
  AboutUs,
  Ambassadors,
  Projects,
  FAQs,
  Goals,
  Hero,
  Mission,
  Numbers,
  Professionals,
  Therapy,
  WhyUs,
} from "./components/PageSection";

export default function LandingPage() {
  return (
    <Main>
      <NavigationBar />
      <Hero />
      <PageSection id="mission">
        <Mission />
      </PageSection>
      <PageSection id="about-us">
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
        id="why-us"
        bgImage="bg-projects-and-therapy.jpg"
        bgDefaultColor="#494a4d"
      >
        <>
          <WhyUs />
          <Therapy />
        </>
      </PageSection>
      <PageSection>
        <Professionals />
      </PageSection>
      <PageSection id="contact" bgDefaultColor="#1c1d20">
        <Contact />
      </PageSection>
      <PageSection id="projects">
        <Projects />
      </PageSection>
      <PageSection id="faqs">
        <FAQs />
      </PageSection>
      <Footer />
    </Main>
  );
}
