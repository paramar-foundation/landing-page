"use client";

import styles from "../NavigationBar.module.scss";

export const Hamburguer = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const getClassName = () => {
    return [styles.hamburger, isOpen ? styles["hamburger--open"] : ""].join(
      " "
    );
  };

  return (
    <article className={getClassName()} onClick={onClick}>
      <div className={styles.hamburger__top}></div>
      <div className={styles.hamburger__middle}></div>
      <div className={styles.hamburger__bottom}></div>
    </article>
  );
};
