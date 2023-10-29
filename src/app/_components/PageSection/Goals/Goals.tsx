"use client";

import { goalsData } from "~/constants";
import { Button, eButtonColor } from "../../Button";
import { Icon } from "../../Icon";

import styles from "./Goals.module.scss";

export const Goals = () => {
  return (
    <article className={styles.goals}>
      <h2 className={styles.goals__title}>
        Nuestras metas <br /> para el 2030
      </h2>
      <ul className={styles.goals__list}>
        {goalsData.map((data) => (
          <li className={styles.goal} key={data.id}>
            <div className={styles.goal__data}>
              <Icon icon={data.icon} width={48} height={40} />
              <span className={styles.goal__number}>{data.number}</span>
            </div>
            <p className={styles.goal__description}>{data.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};
