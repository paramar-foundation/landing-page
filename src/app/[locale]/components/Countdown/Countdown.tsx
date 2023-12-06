"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "./Countdown.module.scss";
import { Logo } from "../Logo";
import Image from "next/image";

export const Countdown = () => {
  const t = useTranslations("generic");
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    function calculateTimeRemaining() {
      const currentDate = new Date();
      const targetDate = new Date("2023-12-10T00:00:00Z");
      const difference = targetDate.getTime() - currentDate.getTime();
      return Math.max(0, difference);
    }

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  return (
    <section className={styles.countdown}>
      <Logo isResponsive={false} />
      <h3>
        <span>{t("launch")}</span>
        <b>{t("launch-date")}</b>
      </h3>
      <div className={styles.time}>
        <article className={styles.time__item}>
          <span className={styles.time__item__number}>{days}</span>
          <span className={styles.time__item__unit}>Days</span>
        </article>
        <p>:</p>
        <article className={styles.time__item}>
          <span className={styles.time__item__number}>{hours}</span>
          <span className={styles.time__item__unit}>Hours</span>
        </article>
        <p>:</p>
        <article className={styles.time__item}>
          <span className={styles.time__item__number}>{minutes}</span>
          <span className={styles.time__item__unit}>Minutes</span>
        </article>
        <p>:</p>
        <article className={styles.time__item}>
          <span className={styles.time__item__number}>{seconds}</span>
          <span className={styles.time__item__unit}>Seconds</span>
        </article>
      </div>
      <div className={styles["countdown__paint-left"]}>
        <Image
          src="/paints/thank-you-page-left.png"
          alt="Paint splatter decoration"
          width={620}
          height={570}
        />
      </div>
      <div className={styles["countdown__paint-right"]}>
        <Image
          src="/paints/thank-you-page-right.png"
          alt="Paint splatter decoration"
          width={400}
          height={570}
        />
      </div>
    </section>
  );
};
