"use client";

import Image from "next/image";
import { Button, eButtonColor } from "../../Button";

import { therapyData } from "~/constants";
import styles from "./Therapy.module.scss";

export const Therapy = () => {
  return (
    <article id="therapy" className={styles.therapy}>
      <div className={styles.therapy__overlay}></div>
      <p className={styles.therapy__subtitle}>Comienza terapia</p>
      <h2 className={styles.therapy__title}>
        ¿Por qué tomar terapia con nosotras?
      </h2>
      <ul className={styles.therapy__cards}>
        {therapyData.map((data) => (
          <li className={styles.card} key={data.id}>
            <div className={styles.card__bg}></div>
            <Image
              className={styles.card__image}
              src={data.paint}
              alt="paint splatter decoration"
              width={200}
              height={150}
            />
            <span className={styles.card__title}>{data.title}</span>
            <p className={styles.card__description}>{data.description}</p>
          </li>
        ))}
      </ul>
      <Button
        color={eButtonColor.purple}
        onClick={() => console.log("Therapy")}
      >
        Solicitar terapia de pago
      </Button>
    </article>
  );
};
