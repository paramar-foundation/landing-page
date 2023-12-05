"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { DonateCard } from "../../../../components/DonateCard";
import { IconButton, eIconButtonType } from "../../../../components/IconButton";

import { api } from "~/src/trpc/react";
import styles from "./Projects.module.scss";

export const Projects = () => {
  const t = useTranslations("projects");
  const [maxIndex, setMaxIndex] = useState(0);
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const { data: projects } = api.projects.getAll.useQuery();

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

  useEffect(() => {
    if (projects) {
      console.log(projects);
      setMaxIndex(projects.length - 1);
    }
  }, [projects]);

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

  const renderMobileCard = () => {
    if (projects?.[pageIndex] !== undefined) {
      const project = projects?.[pageIndex];
      if (project === undefined) return <></>;
      return <DonateCard key={projects?.[pageIndex]?.id} data={project} />;
    }
  };

  return (
    <article className={styles.donations}>
      <p className={styles.donations__subtitle}>{t("subtitle")}</p>
      <h2 className={styles.donations__title}>{t("title")}</h2>
      <p className={styles.donations__body}>{t("description")}</p>
      <div className={styles["donations__cards--desktop"]}>
        {projects
          ?.filter((project) => !project.is_test)
          .map((data) => data && <DonateCard key={data.id} data={data} />)}
      </div>
      <div className={styles["donations__cards--mobile"]}>
        {renderMobileCard()}
      </div>
      {projects && projects.length > 1 && (
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
            {projects.map((data, index) => (
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
