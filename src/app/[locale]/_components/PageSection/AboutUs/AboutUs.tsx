"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./AboutUs.module.scss";

export const AboutUs = () => {
  const t = useTranslations("about-us");
  return (
    <article className={styles["about-us"]}>
      <h2 className={styles["about-us__title"]}>{t("title")}</h2>
      <p className={styles["about-us__body"]}>{t("description")}</p>
      <div className={styles["about-us__cards"]}>
        <article className={styles.card}>
          <Image
            className={styles.card__image}
            src="/paint-aboutus-card-1.png"
            alt="paint splatter decoration"
            width={150}
            height={100}
          />
          <h5 className={styles.card__title}>{t("what-we-do.title")}</h5>
          <ul>
            <li>{t("what-we-do.item-1")}</li>
            <li>{t("what-we-do.item-2")}</li>
          </ul>
        </article>
        <article className={styles.card}>
          <Image
            className={styles.card__image}
            src="/paint-aboutus-card-2.png"
            alt="paint splatter decoration"
            width={150}
            height={100}
          />
          <h5 className={styles.card__title}>{t("how-we-help.title")}</h5>
          <ul>
            <li>{t("how-we-help.item-1")}</li>
            <li>{t("how-we-help.item-2")}</li>
          </ul>
        </article>
        <article className={styles.card}>
          <Image
            className={styles.card__image}
            src="/paint-aboutus-card-3.png"
            alt="paint splatter decoration"
            width={150}
            height={100}
          />
          <h5 className={styles.card__title}>{t("who-we-are.title")}</h5>
          <ul>
            <li>{t("who-we-are.item-1")}</li>
          </ul>
        </article>
      </div>
    </article>
  );
};
