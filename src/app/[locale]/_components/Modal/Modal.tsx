"use client";

import {
  type MouseEventHandler,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import { usePathname, useRouter } from "next-intl/client";

import { ModalContext } from "~/src/contexts";

import styles from "./Modal.module.scss";
import { Icon, eIcons } from "../Icon";

export const Modal = () => {
  const { content, setContent } = useContext(ModalContext);
  const overlay = useRef(null);
  const container = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleDismiss = useCallback(() => {
    setContent(null);
    router.replace(pathname);
  }, [pathname, router, setContent]);

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
        <>
          {content}
          <div className={styles.modal__actions}>
            <div className={styles.modal__back} onClick={handleDismiss}>
              <Icon
                icon={eIcons.arrowRight}
                className={styles.modal__back__icon}
              />
              <span>Volver</span>
            </div>
            <div className={styles.modal__close} onClick={handleDismiss}>
              &times;
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
