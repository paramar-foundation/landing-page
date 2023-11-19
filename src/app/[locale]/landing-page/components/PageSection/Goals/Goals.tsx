"use client";

import { useTranslations } from "next-intl";

import { Icon, eIcons } from "../../../../components/Icon";

import styles from "./Goals.module.scss";

export const Goals = () => {
  const t = useTranslations("goals");
  const goalsIcons = [
    eIcons.woman,
    eIcons.hours,
    eIcons.donation,
    eIcons.therapy,
    eIcons.institution,
    eIcons.users,
  ] as const;

  return (
    <article className={styles.goals}>
      <h2 className={styles.goals__title}>{t("title")}</h2>
      <ul className={styles.goals__list}>
        {goalsIcons.map((icon, index) => (
          <li className={styles.goal} key={icon}>
            <div className={styles.goal__data}>
              <Icon icon={icon} className={styles.goal__icon} />
              <span className={styles.goal__number}>
                {t(`${index + 1}.number`)}
              </span>
            </div>
            <p className={styles.goal__description}>
              {t(`${index + 1}.description`)}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
};
