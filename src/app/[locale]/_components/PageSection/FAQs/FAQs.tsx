"use client";

import { useTranslations } from "next-intl";

import { Accordeon } from "../../Accordeon";
import styles from "./FAQs.module.scss";

export const FAQs = () => {
  const t = useTranslations("faqs");
  const totalFAQs = Array(15);

  for (let i = 0; i < totalFAQs.length; i++) {
    totalFAQs[i] = i + 1;
  }

  return (
    <article className={styles.faqs}>
      <h2 className={styles.faqs__title}>{t("title")}</h2>
      <div className={styles.faqs__list}>
        {totalFAQs.map((faq) => (
          <Accordeon
            key={t(`${faq}.question`)}
            question={t(`${faq}.question`)}
            answer={t(`${faq}.answer`)}
          />
        ))}
      </div>
    </article>
  );
};
