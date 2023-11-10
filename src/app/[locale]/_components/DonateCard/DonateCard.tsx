import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button, eButtonSize } from "../Button";

import styles from "./DonateCard.module.scss";

interface IDonateCardProps {
  data:
    | {
        image: string;
        location: string;
        name: string;
        description: string;
        lastDonation: { time: string; unit: string };
        currentAmount: number;
        goalAmount: number;
      }
    | undefined;
}

export const DonateCard = ({ data }: IDonateCardProps) => {
  const t = useTranslations("projects");

  if (!data) {
    return <></>;
  }

  const {
    image,
    location,
    name,
    description,
    lastDonation,
    currentAmount,
    goalAmount,
  } = data;

  const getProgressPercent = () => {
    return `${((currentAmount / goalAmount) * 100).toFixed(0)}%`;
  };

  return (
    <article className={styles["donate-card"]}>
      <div className={styles["image-container"]}>
        <Image
          src={image}
          alt={`${name} donation cover`}
          width={400}
          height={400}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.content__location}>{location}</p>
        <p className={styles.content__name}>{name}</p>
        <p className={styles.content__description}>{description}</p>
        <p className={styles.content__last}>
          {t.rich("donate-card-last-donation", {
            time: lastDonation.time,
            unit: lastDonation.unit,
          })}
        </p>
        <div className={styles.content__bar}>
          <div
            className={styles.content__progress}
            style={{ width: getProgressPercent() }}
          ></div>
        </div>
        <p className={styles.content__summary}>
          <b>${Intl.NumberFormat().format(currentAmount)} recolectados de </b>$
          {Intl.NumberFormat().format(goalAmount)}
        </p>
        <Button fullWidth size={eButtonSize.small}>
          {t("donate-card-btn")}
        </Button>
      </div>
    </article>
  );
};
