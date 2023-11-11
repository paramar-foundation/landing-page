"use client";

import { useState } from "react";

import { ModalContext } from "~/src/contexts";

import { Footer } from "./_components/Footer";
import { NavigationBar } from "./_components/NavigationBar";
import { PageSection } from "./_components/PageSection";
import { AboutUs } from "./_components/PageSection/AboutUs";
import { Ambassadors } from "./_components/PageSection/Ambassadors";
import { Contact } from "./_components/PageSection/Contact";
import { Projects } from "./_components/PageSection/Projects";
import { FAQs } from "./_components/PageSection/FAQs";
import { Goals } from "./_components/PageSection/Goals";
import { Hero } from "./_components/PageSection/Hero";
import { Mission } from "./_components/PageSection/Mission";
import { Numbers } from "./_components/PageSection/Numbers";
import { Professionals } from "./_components/PageSection/Professionals";
import { Therapy } from "./_components/PageSection/Therapy";
import { WhyUs } from "./_components/PageSection/WhyUs";

import { Modal } from "./_components/Modal";

import styles from "./layout.module.scss";

export default function Home() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <ModalContext.Provider
      value={{ content: modalContent, setContent: setModalContent }}
    >
      <main className={styles.main}>
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
      </main>
      {modalContent && <Modal />}
    </ModalContext.Provider>
  );
}
