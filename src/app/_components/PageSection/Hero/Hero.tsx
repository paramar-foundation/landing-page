"use client";

import Image from "next/image";
import { Button, eButtonColor } from "../../Button";
import { Icon, eIcons } from "../../Icon";

import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <article className={styles.hero}>
      <span className={styles.hero__source}>
        Organización Mundial de la Salud, 2019/ UN Women, 2022
      </span>
      <span className={styles.hero__quote}>
        Cada <b>2 segundos</b> una mujer o niña no recibe apoyo psicológico tras
        una agresión sexual quedando marcada de por vida.
      </span>
      <Button color={eButtonColor.orange} onClick={() => console.log("Hero")}>
        AYÚDANOS A EVITARLO
      </Button>
      <div className={styles["hero__know-more"]}>
        <span>Conoce más</span>
        <div className={styles["hero__know-more__arrow"]}>
          <div className="line"></div>
          <Icon icon={eIcons.chevronDown} width={23} height={20} />
        </div>
      </div>
      <Image
        className={styles.hero__paint}
        src="/paint-hero.png"
        alt="Paint splatter decoration"
      />
    </article>
  );
};
