"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import Image from "next/image";

import { Button, eButtonColor } from "../../../../components/Button";

import styles from "./Numbers.module.scss";

export const Numbers = () => {
  const t = useTranslations("numbers");
  const pathname = usePathname();
  const router = useRouter();
  const numbers = [1, 2, 3] as const;

  return (
    <article className={styles.numbers}>
      <div className={styles.numbers__overlay}></div>
      <span className={styles.numbers__title}>{t("title")}</span>
      <ul className={styles.numbers__list}>
        {numbers.map((number) => (
          <li className={styles.number} key={number}>
            <span className={styles.number__main}>{t(`${number}.number`)}</span>
            <span className={styles.number__type}>{t(`${number}.type`)}</span>
            <p className={styles.number__description}>
              {t(`${number}.description`)}
            </p>
          </li>
        ))}
      </ul>
      <Button
        color={eButtonColor.orange}
        onClick={() => router.replace(pathname + "#projects")}
      >
        {t("call-to-action")}
      </Button>
      <Image
        className={styles["numbers__paint-top"]}
        src="/paints/numbers-top.png"
        alt="Paint splatter decoration"
        width={200}
        height={200}
      />
      <Image
        className={styles["numbers__paint-bottom"]}
        src="/paints/numbers-bottom.png"
        alt="Paint splatter decoration"
        width={200}
        height={200}
      />
      <span className={styles.numbers__source}>{t("source")}</span>
    </article>
  );
};
