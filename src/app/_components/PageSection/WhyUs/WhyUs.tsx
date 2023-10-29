"use client";

import { Button, eButtonColor } from "../../Button";
import { whyUsData } from "~/constants";
import styles from "./WhyUs.module.scss";

export const WhyUs = () => {
  return (
    <article className={styles["why-us"]}>
      <div className={styles["why-us__overlay"]}></div>
      <p className={styles["why-us__subtitle"]}>Conoce nuestros proyectos</p>
      <h1 className={styles["why-us__title"]}>¿Por qué donar con nosotras?</h1>
      <ul className={styles["why-us__cards"]}>
        {whyUsData.map((data) => (
          <li className={styles.card} key={data.id}>
            <div className={styles.card__bg}></div>
            <img
              className={styles.card__image}
              src={data.paint}
              alt="paint splatter decoration"
            />
            <span className={styles.card__title}>{data.title}</span>
            <p className={styles.card__description}>{data.description}</p>
          </li>
        ))}
      </ul>
      <Button color={eButtonColor.purple} onClick={() => console.log("Why Us")}>
        Dona ahora
      </Button>
    </article>
  );
};
