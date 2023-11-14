"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { MainScrollContext, ModalContext } from "~/src/contexts";

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
import { ProjectModal } from "./_components/Modal/ProjectModal";

import { donationsData } from "~/src/constants";
import styles from "./layout.module.scss";

export default function Home() {
  const [modalContent, setModalContent] = useState(null as ReactNode | null);
  const [scroll, setScroll] = useState(0);
  const queryParams = useSearchParams();

  useEffect(() => {
    const project = queryParams.get("project");
    const projectData = donationsData.find(
      ({ id }) => id.toString() === project
    );

    if (projectData) {
      setModalContent(<ProjectModal data={projectData} />);
    }
  }, [queryParams]);

  const getClassName = () => {
    return [styles.main, modalContent && styles["main--modal-open"]].join(" ");
  };

  return (
    <MainScrollContext.Provider value={scroll}>
      <ModalContext.Provider
        value={{ content: modalContent, setContent: setModalContent }}
      >
        <main
          className={getClassName()}
          onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
        >
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
    </MainScrollContext.Provider>
  );
}
