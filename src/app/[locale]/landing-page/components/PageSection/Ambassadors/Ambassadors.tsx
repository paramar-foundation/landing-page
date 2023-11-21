"use client";

import { useEffect, useState } from "react";

import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";

import { IconButton, eIconButtonType } from "../../../../components/IconButton";
import { Icon, eIcons } from "../../../../components/Icon";

import { ambassadors } from "~/constants";
import styles from "./Ambassadors.module.scss";
import Image from "next/image";

export const Ambassadors = () => {
  const t = useTranslations("ambassadors");
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const locale = useLocale();

  const getDotClassName = (i: number) => {
    return [styles.dot, i === index ? styles["dot--active"] : ""].join(" ");
  };

  const handlePrevious = () => {
    if (!isPrevDisabled) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (index >= ambassadors.length - 1) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (index <= 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [index]);

  return (
    <article className={styles.ambassadors}>
      <div className={styles.ambassadors__image}>
        <Image
          src={`/profile-${ambassadors[index]}.jpg`}
          alt={ambassadors[index]!}
          loading="lazy"
          width={450}
          height={600}
        />
        <Image
          src="/paints/ambassador-bottom.png"
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
          “{t(`${ambassadors[index]}.quote`)}”
        </p>
        <div className={styles.ambassadors__data}>
          <p className={styles.ambassadors__name}>
            {t(`${ambassadors[index]}.name`)}
          </p>
          <p className={styles.ambassadors__role}>
            {t(`${ambassadors[index]}.role`)}
          </p>
          <ul className={styles.ambassadors__socials}>
            {t(`${ambassadors[index]}.instagram`) !== "" && (
              <li>
                <Icon icon={eIcons.socialInstagram} />
              </li>
            )}
            {t(`${ambassadors[index]}.x`) !== "" && (
              <li>
                <Icon icon={eIcons.socialX} />
              </li>
            )}
            {t(`${ambassadors[index]}.linked-in`) !== "" && (
              <li>
                <Icon icon={eIcons.socialLinkedIn} />
              </li>
            )}
          </ul>
        </div>
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
            {ambassadors.map((ambassador, index) => (
              <li
                className={getDotClassName(index)}
                key={ambassador}
                onClick={() => setIndex(index)}
              />
            ))}
          </ul>
        </div>
        <Link
          href={"/ambassadors"}
          onClick={() => console.log(locale)}
          className={styles["ambassadors__know-more"]}
        >
          <span>{t("know-more")}</span>
          <Icon
            icon={eIcons.arrowRight}
            className={styles["ambassadors__know-more__arrow"]}
          />
        </Link>
      </div>
    </article>
  );
};
