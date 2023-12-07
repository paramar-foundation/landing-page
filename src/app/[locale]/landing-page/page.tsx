"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { api } from "~/src/trpc/react";
import { ModalContext } from "~/src/contexts";

import { Footer, Main, Modal, NavigationBar, Project } from "../components";
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
  const [modalContent, setModalContent] = useState<null | React.ReactNode>(
    null
  );
  const queryParams = useSearchParams();
  const { data: projects } = api.projects.getAll.useQuery();

  useEffect(() => {
    const project = queryParams.get("project");
    const projectData = projects?.find(({ id }) => id.toString() === project);

    if (projectData) {
      setModalContent(<Project data={projectData} />);
    }
  }, [queryParams, projects]);

  return (
    <ModalContext.Provider
      value={{ content: modalContent, setContent: setModalContent }}
    >
      <Main isModalOpen={!!modalContent}>
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

      {modalContent && <Modal />}
    </ModalContext.Provider>
  );
}
