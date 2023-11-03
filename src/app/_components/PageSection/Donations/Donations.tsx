"use client";
import { useEffect, useState } from "react";

import { DonateCard } from "../../DonateCard";
import { IconButton, eIconButtonType } from "../../IconButton";

import { donationsData } from "~/constants";
import styles from "./Donations.module.scss";

export const Donations = () => {
  const maxIndex = donationsData.length - 1;
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [displayIndexes, setDisplayIndexes] = useState([0]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pages, setPages] = useState([0]);

  const getDotClassName = (index: number) => {
    return [styles.dot, index === pageIndex ? styles["dot--active"] : ""].join(
      " "
    );
  };

  const handlePrevious = () => {
    if (!isPrevDisabled) {
      setDisplayIndexes((prev) => prev.map((value) => value - 1));
      setPageIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setDisplayIndexes((prev) => prev.map((value) => value + 1));
      setPageIndex((prev) => prev + 1);
    }
  };

  const setPagesAmount = (amount: number) => {
    {
      const pages = [];
      for (let index = 0; index < amount; index++) {
        pages.push(index);
      }

      setPages(pages);
    }
  };

  useEffect(() => {
    const updateDisplayCards = () => {
      if (window.innerWidth >= 1024) {
        setPagesAmount(Math.ceil(donationsData.length / 3));
        setDisplayIndexes([0, 1, 2]);
        if (pageIndex > 2) setPageIndex(1);
      } else if (window.innerWidth < 1024 && window.innerWidth > 744) {
        setPagesAmount(Math.ceil(donationsData.length / 2));
        setDisplayIndexes([0, 1]);
        if (pageIndex > 1) setPageIndex(0);
      } else {
        setPagesAmount(Math.ceil(donationsData.length / 1));
        setDisplayIndexes([0]);
      }
    };

    updateDisplayCards();

    window.addEventListener("resize", updateDisplayCards);

    return () => {
      window.removeEventListener("resize", updateDisplayCards);
    };
  }, []);

  useEffect(() => {
    if (displayIndexes[displayIndexes.length - 1]! >= maxIndex) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (displayIndexes[0]! <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [displayIndexes]);

  return (
    <article className={styles.donations}>
      <p className={styles.donations__subtitle}>Nuestros proyectos</p>
      <h2 className={styles.donations__title}>Sé parte del cambio</h2>
      <p className={styles.donations__body}>
        Tu apoyo generoso a alguno de nuestros proyectos es un paso valioso
        hacia un mundo mejor, donde más mujeres y niñas puedan recibir la ayuda
        que necesitan.
      </p>
      <div className={styles.donations__cards}>
        {displayIndexes.map((index) => (
          <DonateCard
            key={donationsData[index]?.id}
            data={donationsData[index]}
          />
        ))}
      </div>
      {pages.length != 1 && (
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
            {pages.map((indexValue, index) => (
              <li className={getDotClassName(index)} key={indexValue} />
            ))}
          </ul>
        </div>
      )}
      <p className={styles.donations__thanks}>
        ¡Gracias! Todas las donaciones recibidas son deducibles de impuestos
      </p>
    </article>
  );
};
