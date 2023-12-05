"use client";

import { useState, type ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Modal, Project } from "../Modal";

import styles from "./Main.module.scss";
import { MainScrollContext, ModalContext } from "~/src/contexts";
import { api } from "~/src/trpc/react";

export const Main = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [scroll, setScroll] = useState(0);
  const queryParams = useSearchParams();
  const { data: projects } = api.projects.getAll.useQuery();

  useEffect(() => {
    const project = queryParams.get("project");
    const projectData = projects?.find(({ id }) => id.toString() === project);

    if (projectData) {
      setModalContent(<Project data={projectData} />);
    }
  }, [queryParams, projects]);

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
          {children}
        </main>
        {modalContent && <Modal />}
      </ModalContext.Provider>
    </MainScrollContext.Provider>
  );
};
