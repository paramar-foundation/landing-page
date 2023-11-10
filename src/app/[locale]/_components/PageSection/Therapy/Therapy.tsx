"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import Image from "next/image";

import { Button, eButtonColor } from "../../Button";

import styles from "./Therapy.module.scss";

export const Therapy = () => {
  const t = useTranslations("therapy");
  const pathname = usePathname();
  const router = useRouter();

  const paintList = ["/paints/planet.png", "/paints/green.png"] as const;

  return (
    <article id="therapy" className={styles.therapy}>
      <div className={styles.therapy__overlay}></div>
      <p className={styles.therapy__subtitle}>{t("subtitle")}</p>
      <h2 className={styles.therapy__title}>{t("title")}</h2>
      <ul className={styles.therapy__cards}>
        {paintList.map((paint, index) => (
          <li className={styles.card} key={paint}>
            <div className={styles.card__bg}></div>
            <Image
              className={styles.card__image}
              src={paint}
              alt="paint splatter decoration"
              width={150}
              height={150}
            />
            <span className={styles.card__title}>
              {t(`${index + 1}.title`)}
            </span>
            <p className={styles.card__description}>
              {t(`${index + 1}.description`)}
            </p>
          </li>
        ))}
      </ul>
      <Button
        color={eButtonColor.purple}
        onClick={() => router.replace(pathname + "#contact")}
      >
        {t("call-to-action")}
      </Button>
    </article>
  );
};
