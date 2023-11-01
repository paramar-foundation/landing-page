"use client";
import Image from "next/image";

import { Button, eButtonColor } from "../../Button";

import { numbersData } from "~/constants";
import styles from "./Numbers.module.scss";

export const Numbers = () => {
  return (
    <article className={styles.numbers}>
      <div className={styles.numbers__overlay}></div>
      <span className={styles.numbers__title}>LA PROBLEMÁTICA EN CIFRAS</span>
      <ul className={styles.numbers__list}>
        {numbersData.map((data) => (
          <li className={styles.number} key={data.number}>
            <span className={styles.number__main}>{data.number}</span>
            <span className={styles.number__type}>{data.type}</span>
            <p className={styles.number__description}>{data.description}</p>
          </li>
        ))}
      </ul>
      <Button
        color={eButtonColor.orange}
        onClick={() => console.log("Numbers")}
      >
        Ayúdanos a evitarlo
      </Button>
      <Image
        className={styles["numbers__paint-top"]}
        src="/paint-numbers-top.png"
        alt="Paint splatter decoration"
      />
      <Image
        className={styles["numbers__paint-bottom"]}
        src="/paint-numbers-bottom.png"
        alt="Paint splatter decoration"
      />
      <span className={styles.numbers__source}>
        Organización Mundial de la Salud, 2019/ UN Women, 2022
      </span>
    </article>
  );
};
