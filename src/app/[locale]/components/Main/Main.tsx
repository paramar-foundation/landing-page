"use client";

import { useState, type ReactNode } from "react";

import styles from "./Main.module.scss";
import { MainScrollContext } from "~/src/contexts";

export const Main = ({
  children,
  isModalOpen = false,
}: {
  children: ReactNode;
  isModalOpen?: boolean;
}) => {
  const [scroll, setScroll] = useState(0);

  const getClassName = () => {
    return [styles.main, isModalOpen && styles["main--modal-open"]].join(" ");
  };

  return (
    <MainScrollContext.Provider value={scroll}>
      <main
        className={getClassName()}
        onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
      >
        {children}
      </main>
    </MainScrollContext.Provider>
  );
};
