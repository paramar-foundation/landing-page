"use client";

import { useState, type ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Modal, ProjectModal } from "../Modal";

import { donationsData } from "~/src/constants";
import styles from "./Main.module.scss";
import { MainScrollContext, ModalContext } from "~/src/contexts";

export const Main = ({ children }: { children: ReactNode }) => {
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
          {children}
        </main>
        {modalContent && <Modal />}
      </ModalContext.Provider>
    </MainScrollContext.Provider>
  );
};
