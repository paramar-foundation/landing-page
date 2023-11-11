"use client";

import {
  type MouseEventHandler,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";

import { ModalContext } from "~/src/contexts";

import styles from "./Modal.module.scss";

export const Modal = () => {
  const { content, setContent } = useContext(ModalContext);
  const overlay = useRef(null);
  const container = useRef(null);

  const handleDismiss = useCallback(() => {
    setContent(null);
  }, [setContent]);

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === container.current) {
        if (handleDismiss) handleDismiss();
      }
    },
    [handleDismiss, overlay, container]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    },
    [handleDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div ref={overlay} className={styles.modal} onClick={handleClick}>
      <div ref={container} className={styles.modal__container}>
        {content}
      </div>
    </div>
  );
};
