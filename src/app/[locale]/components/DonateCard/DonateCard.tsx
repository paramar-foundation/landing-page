"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { type IProject } from "~/src/types";
import { compareDates } from "~/src/utils";

import { Button, eButtonSize } from "../Button";

import styles from "./DonateCard.module.scss";

export const DonateCard = ({ data }: { data: IProject }) => {
  const t = useTranslations("projects");
  const tGeneric = useTranslations("generic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lastDonationTime, setLastDonationTime] = useState<number | string>(0);
  const [lastDonationUnit, setLastDonationUnit] = useState("-");
  const [totalDonated, setTotalDonated] = useState(0);
  const router = useRouter();
  const locale = useLocale();

  const { image, location, donations, goal } = data;

  useEffect(() => {
    if (locale === "es" || locale === "en") {
      setTitle(data[`title_${locale}`]);
      setDescription(data[`description_${locale}`]);
    }
  }, [data, locale]);

  useEffect(() => {
    const total = donations.reduce((partialSum, a) => partialSum + a.amount, 0);
    const { time, unit } = compareDates(
      donations[donations.length - 1]?.createdAt
    );

    setTotalDonated(total);
    setLastDonationTime(time);
    setLastDonationUnit(unit);
  }, [donations]);

  const getProgressPercent = () => {
    return `${((totalDonated / goal) * 100).toFixed(0)}%`;
  };

  const handleDonateClick = () => {
    router.push(`?project=${data.id}`);
  };

  return (
    <article className={styles["donate-card"]}>
      <div className={styles["image-container"]}>
        <Image
          src={image}
          alt={`${title} donation cover`}
          width={400}
          height={400}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.content__location}>{location}</p>
        <p className={styles.content__name}>{title}</p>
        <p
          className={styles.content__description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <p className={styles.content__last}>
          {t.rich("donate-card-last-donation", {
            time: lastDonationTime,
            unit: tGeneric(lastDonationUnit),
          })}
        </p>
        <div className={styles.content__bar}>
          <div
            className={styles.content__progress}
            style={{ width: getProgressPercent() }}
          ></div>
        </div>
        <p className={styles.content__summary}>
          <b>${Intl.NumberFormat().format(totalDonated)} recolectados de </b>$
          {Intl.NumberFormat().format(goal)}
        </p>
        <Button
          fullWidth
          size={eButtonSize.small}
          onClick={() => handleDonateClick()}
        >
          {t("donate-card-btn")}
        </Button>
      </div>
    </article>
  );
};
