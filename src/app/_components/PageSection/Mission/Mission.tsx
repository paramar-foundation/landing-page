"use client";

import Image from "next/image";
import { Button, eButtonColor } from "../../Button";

import styles from "./Mission.module.scss";

export const Mission = () => {
  return (
    <article className={styles.mission}>
      <div className={styles["mission__image-container"]}>
        <Image
          className={styles.mission__image}
          src="/mission-section.jpg"
          alt="Three women"
        />
      </div>
      <div className={styles.mission__content}>
        <p className={styles.mission__subtitle}>Nuestra misión</p>
        <h2 className={styles.mission__title}>
          Que toda mujer o niña víctima de agresión sexual tenga acceso a apoyo
          psicológico.
        </h2>
        <p className={styles.mission__body}>
          Nos dedicamos a proporcionar apoyo psicológico a mujeres y niñas que
          son víctimas de agresiones sexuales y a conseguirlo de manera gratuita
          para aquellas que carecen de recursos. Lo hacemos a través de
          proyectos externos e internos que financiamos con el 100% de nuestros
          beneficios y donaciones.
        </p>
        <Button
          color={eButtonColor.purple}
          onClick={() => console.log("Mission")}
        >
          Conoce nuestros proyectos
        </Button>
      </div>
    </article>
  );
};
