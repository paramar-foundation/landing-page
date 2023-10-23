"use client";

import { Button, ButtonColor, ButtonType } from "../Button";
import { Icon, IconEnum } from "../Icon";

import styles from "./Banner.module.scss";

export const Banner = () => {
  return (
    <article className={styles.banner}>
      <span className={styles.banner__source}>
        Organización Mundial de la Salud, 2019/ UN Women, 2022
      </span>
      <span className={styles.banner__quote}>
        Cada <b>2 segundos</b> una mujer o niña no recibe apoyo psicológico tras
        una agresión sexual quedando marcada de por vida.
      </span>
      <Button color={ButtonColor.orange} onClick={() => console.log("Hello")}>
        AYÚDANOS A EVITARLO
      </Button>
      <div className={styles["banner__know-more"]}>
        <span>Conoce más</span>
        <Icon icon={IconEnum.chevronDown} width={24} height={20} />
      </div>
    </article>
  );
};
