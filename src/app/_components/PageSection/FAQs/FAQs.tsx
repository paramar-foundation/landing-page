"use client";

import { faqsData } from "~/constants";
import { Button, eButtonColor } from "../../Button";
import { Icon } from "../../Icon";

import styles from "./FAQs.module.scss";
import { Accordeon } from "../../Accordeon";

export const FAQs = () => {
  return (
    <article className={styles.faqs}>
      <h2 className={styles.faqs__title}>
        Preguntas <br /> frecuentes
      </h2>
      <div className={styles.faqs__list}>
        {faqsData.map(({ id, question, answer }) => (
          <Accordeon key={id} question={question} answer={answer} />
        ))}
      </div>
    </article>
  );
};
