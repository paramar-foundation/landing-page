"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";

import { Button, eButtonColor } from "../../../../components/Button";
import { Icon, eIcons } from "../../../../components/Icon";

import styles from "./Hero.module.scss";

export const Hero = () => {
  const t = useTranslations("hero");
  const router = useRouter();
  const [bgIndex, setBgIndex] = useState(1);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => {
        if (prev >= 3) return 1;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(bgInterval);
  }, []);

  const getClassName = () => {
    return [
      styles["page-section"],
      bgIndex === 1 && styles["page-section--bg-1"],
      bgIndex === 2 && styles["page-section--bg-2"],
      bgIndex === 3 && styles["page-section--bg-3"],
    ].join(" ");
  };

  return (
    <section className={getClassName()}>
      <div className={styles.anchor} id={"hero"}></div>
      <article className={styles.hero}>
        <span className={styles.hero__source}>{t("source")}</span>
        <span
          className={styles.hero__quote}
          dangerouslySetInnerHTML={{ __html: t.raw("quote") as string }}
        />
        <Button
          color={eButtonColor.orange}
          onClick={() => router.push("/projects")}
        >
          {t("cta")}
        </Button>
        <div className={styles["hero__know-more"]}>
          <span>{t("know-more")}</span>
          <div className={styles["hero__know-more__arrow"]}>
            <div className="line"></div>
            <Icon icon={eIcons.chevronDown} />
          </div>
        </div>
        <Image
          className={styles.hero__paint}
          src={"/paints/hero.png"}
          alt="Paint splatter decoration"
          width={300}
          height={300}
        />
      </article>
    </section>
  );
};
