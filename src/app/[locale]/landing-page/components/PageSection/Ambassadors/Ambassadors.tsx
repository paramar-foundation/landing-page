/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

"use client";

import { useEffect, useState } from "react";

import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";

import { api } from "~/src/trpc/react";
import { IconButton, eIconButtonType } from "../../../../components/IconButton";
import { Icon, eIcons } from "../../../../components/Icon";

import styles from "./Ambassadors.module.scss";
import Image from "next/image";

export const Ambassadors = () => {
  const t = useTranslations("ambassadors");
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const locale = useLocale();
  const { data: ambassadors } = api.ambassador.getAll.useQuery();

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
    if (ambassadors) {
      if (locale === "es" || locale === "en") {
        setRole(ambassadors?.[index]?.[`role_${locale}`] ?? "");
        setQuote(ambassadors?.[index]?.[`quote_${locale}`] ?? "");
      }

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
    }
  }, [ambassadors, index, locale]);

  return (
    <article className={styles.ambassadors}>
      <div className={styles.ambassadors__image}>
        <Image
          src={ambassadors?.[index]?.picture ?? ""}
          alt={`${ambassadors?.[index]?.name} profile picture`}
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
        <p className={styles.ambassadors__quote}>“{quote}”</p>
        <div className={styles.ambassadors__data}>
          <p className={styles.ambassadors__name}>
            {ambassadors?.[index]?.name}
          </p>
          <p className={styles.ambassadors__role}>{role}</p>
          <ul className={styles.ambassadors__socials}>
            {ambassadors?.[index]?.instagram && (
              <li>
                <Link
                  href={ambassadors?.[index]?.instagram ?? ""}
                  target="_blank"
                >
                  <Icon icon={eIcons.socialInstagram} />
                </Link>
              </li>
            )}
            {ambassadors?.[index]?.x && (
              <li>
                <Link href={ambassadors?.[index]?.x ?? ""} target="_blank">
                  <Icon icon={eIcons.socialX} />
                </Link>
              </li>
            )}
            {ambassadors?.[index]?.linkedin && (
              <li>
                <Link
                  href={ambassadors?.[index]?.linkedin ?? ""}
                  target="_blank"
                >
                  <Icon icon={eIcons.socialLinkedIn} />
                </Link>
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
            {ambassadors?.map((ambassador, index) => (
              <li
                className={getDotClassName(index)}
                key={ambassador.id}
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
