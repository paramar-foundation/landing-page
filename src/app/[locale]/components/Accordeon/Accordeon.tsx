"use client";

import { useState } from "react";
import styles from "./Accordeon.module.scss";

interface IAccordeonProps {
  question: string;
  answer: string;
}

export const Accordeon = ({ question, answer }: IAccordeonProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const getClassName = () => {
    return [
      styles.accordeon,
      isExpanded ? styles["accordeon--expanded"] : "",
    ].join(" ");
  };

  return (
    <article className={getClassName()}>
      <hr />
      <div
        className={styles.accordeon__main}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={styles.accordeon__icon}>
          <div className={styles["accordeon__icon-horizontal"]}></div>
          <div className={styles["accordeon__icon-vertical"]}></div>
        </div>
        <p className={styles.accordeon__question}>{question}</p>
      </div>
      <p className={styles.accordeon__answer}>{answer}</p>
    </article>
  );
};
