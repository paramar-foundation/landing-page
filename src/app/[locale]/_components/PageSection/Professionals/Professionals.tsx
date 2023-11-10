"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { IconButton, eIconButtonType } from "../../IconButton";

import { professionalsData } from "~/constants";
import styles from "./Professionals.module.scss";

export const Professionals = () => {
  const t = useTranslations("professionals");
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const professionals = useMemo(() => ["camila-gonzalez"], []);

  const getDotClassName = (index: number) => {
    return [
      styles.professionals__dot,
      index === index ? styles["professionals__dot--active"] : "",
    ].join(" ");
  };

  const handlePrevious = () => {
    if (!isPrevDisabled) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (index >= professionals.length - 1) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (index <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [index, professionals]);

  return (
    <article className={styles.professionals}>
      <div className={styles["professionals__image-container"]}>
        <Image
          src="/paint-image-decorator-top.png"
          alt="Paint Decoration"
          loading="lazy"
          width={300}
          height={250}
          className={styles["paint-top"]}
        />
        <Image
          src={`/profile-${professionals[index]}.jpg`}
          alt={
            t.rich("profile-picture", {
              name: professionals[index],
            }) as string
          }
          loading="lazy"
          width={600}
          height={700}
        />
        <Image
          src="/paint-image-decorator-bottom.png"
          alt="Paint Decoration"
          loading="lazy"
          width={320}
          height={350}
          className={styles["paint-bottom"]}
        />
      </div>
      <div className={styles.professionals__content}>
        <p className={styles.professionals__subtitle}>{t("title")}</p>
        <h2 className={styles.professionals__title}>
          {t(`${professionals[index]}.name`)}
        </h2>
        <ul className={styles.professionals__areas}>
          <li className={styles.professionals__area}>
            {t(`${professionals[index]}.expertise-1`)}
          </li>
          <li className={styles.professionals__area}>
            {t(`${professionals[index]}.expertise-2`)}
          </li>
          <li className={styles.professionals__area}>
            {t(`${professionals[index]}.expertise-3`)}
          </li>
        </ul>
        <p className={styles.professionals__bio}>
          {t(`${professionals[index]}.description`)}
        </p>
        {professionals.length > 1 && (
          <>
            <div className={styles["professionals__button-container"]}>
              <IconButton
                type={eIconButtonType.previous}
                onClick={() => handlePrevious()}
                disabled={isPrevDisabled}
              />
              <IconButton
                type={eIconButtonType.next}
                onClick={() => handleNext()}
                disabled={isNextDisabled}
              />
            </div>
            <ul className={styles.professionals__dots}>
              {professionalsData.map(({ name }, index) => (
                <li
                  className={getDotClassName(index)}
                  key={name}
                  onClick={() => setIndex(index)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
};
