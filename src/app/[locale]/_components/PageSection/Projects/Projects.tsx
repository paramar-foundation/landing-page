"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { DonateCard } from "../../DonateCard";
import { IconButton, eIconButtonType } from "../../IconButton";

import { donationsData } from "~/constants";
import styles from "./Projects.module.scss";

export const Projects = () => {
  const t = useTranslations("projects");
  const maxIndex = donationsData.length - 1;
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const getDotClassName = (index: number) => {
    return [styles.dot, index === pageIndex ? styles["dot--active"] : ""].join(
      " "
    );
  };

  const handlePrevious = () => {
    if (!isPrevDisabled) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setPageIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (pageIndex >= maxIndex) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (pageIndex <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [maxIndex, pageIndex]);

  return (
    <article className={styles.donations}>
      <p className={styles.donations__subtitle}>{t("subtitle")}</p>
      <h2 className={styles.donations__title}>{t("title")}</h2>
      <p className={styles.donations__body}>{t("description")}</p>
      <div className={styles["donations__cards--desktop"]}>
        {donationsData.map((data) => (
          <DonateCard key={data.id} data={data} />
        ))}
      </div>
      <div className={styles["donations__cards--mobile"]}>
        <DonateCard
          key={donationsData[pageIndex]?.id}
          data={donationsData[pageIndex]}
        />
      </div>
      {donationsData.length > 1 && (
        <div className={styles["donations__button-container"]}>
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
          <ul className={styles.donations__dots}>
            {donationsData.map((data, index) => (
              <li
                className={getDotClassName(index)}
                key={data.id}
                onClick={() => setPageIndex(index)}
              />
            ))}
          </ul>
        </div>
      )}
      <p className={styles.donations__thanks}>{t("thank-you")}</p>
    </article>
  );
};
