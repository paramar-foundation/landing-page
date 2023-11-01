"use client";
import { useEffect, useState } from "react";

import { IconButton, eIconButtonType } from "../../IconButton";

import { professionalsData } from "~/constants";
import styles from "./Professionals.module.scss";
import Image from "next/image";

export const Professionals = () => {
  const maxIndex = professionalsData.length - 1;
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [professionalIndex, setProfessionalIndex] = useState(0);

  const getDotClassName = (index: number) => {
    return [
      styles.professionals__dot,
      index === professionalIndex ? styles["professionals__dot--active"] : "",
    ].join(" ");
  };

  const handlePrevious = () => {
    if (!isPrevDisabled) {
      setProfessionalIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setProfessionalIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (professionalIndex >= maxIndex) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (professionalIndex <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [professionalIndex]);

  return (
    <article className={styles.professionals}>
      <div className={styles["professionals__image-container"]}>
        <Image
          className={styles.professionals__image}
          src={professionalsData[professionalIndex]!.profile}
          alt={`${professionalsData[professionalIndex]?.name} profile picture`}
          loading="lazy"
        />
      </div>
      <div className={styles.professionals__content}>
        <p className={styles.professionals__subtitle}>Nuestras profesionales</p>
        <h2 className={styles.professionals__title}>
          {professionalsData[professionalIndex]?.name}
        </h2>
        <ul className={styles.professionals__areas}>
          {professionalsData[professionalIndex]?.expertise.map((area) => (
            <li className={styles.professionals__area} key={area}>
              {area}
            </li>
          ))}
        </ul>
        <p className={styles.professionals__bio}>
          {professionalsData[professionalIndex]?.bio}
        </p>
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
              onClick={() => setProfessionalIndex(index)}
            />
          ))}
        </ul>
      </div>
    </article>
  );
};
