"use client";

import { useEffect, useState } from "react";

import { IconButton, eIconButtonType } from "../../IconButton";
import { Icon, eIcons } from "../../Icon";

import { ambassadorsData } from "~/constants";
import styles from "./Ambassadors.module.scss";
import Image from "next/image";

export const Ambassadors = () => {
  const maxIndex = ambassadorsData.length - 1;
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [ambassadorIndex, setambassadorIndex] = useState(0);

  const getDotClassName = (index: number) => {
    return [
      styles.dot,
      index === ambassadorIndex ? styles["dot--active"] : "",
    ].join(" ");
  };

  const handlePrevious = () => {
    if (!isPrevDisabled) {
      setambassadorIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setambassadorIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (ambassadorIndex >= maxIndex) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (ambassadorIndex <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [ambassadorIndex]);

  return (
    <article className={styles.ambassadors}>
      <div className={styles.ambassadors__image}>
        <Image
          src={ambassadorsData[ambassadorIndex]!.profile}
          alt={`${ambassadorsData[ambassadorIndex]?.name} profile picture`}
          loading="lazy"
          width={400}
          height={400}
        />
        <Image
          src="/paint-ambassador-bottom.png"
          alt="Paint Decoration"
          loading="lazy"
          width={175}
          height={200}
          className={styles.paint}
        />
      </div>
      <div className={styles.ambassadors__content}>
        <Icon
          icon={eIcons.quote}
          className={styles["ambassadors__quote-icon"]}
        />
        <p className={styles.ambassadors__quote}>
          “{ambassadorsData[ambassadorIndex]?.quote}”
        </p>
        <p className={styles.ambassadors__name}>
          {ambassadorsData[ambassadorIndex]?.name}
        </p>
        <p className={styles.ambassadors__role}>
          {ambassadorsData[ambassadorIndex]?.role}
        </p>
        <ul className={styles.ambassadors__socials}>
          {ambassadorsData[ambassadorIndex]?.instagram && (
            <li>
              <Icon icon={eIcons.socialInstagram} />
            </li>
          )}
          {ambassadorsData[ambassadorIndex]?.x && (
            <li>
              <Icon icon={eIcons.socialX} />
            </li>
          )}
          {ambassadorsData[ambassadorIndex]?.linkedin && (
            <li>
              <Icon icon={eIcons.socialLinkedIn} />
            </li>
          )}
        </ul>
        <div className={styles["ambassadors__button-container"]}>
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
          <ul className={styles.ambassadors__dots}>
            {ambassadorsData.map(({ id }, index) => (
              <li
                className={getDotClassName(index)}
                key={id}
                onClick={() => setambassadorIndex(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
