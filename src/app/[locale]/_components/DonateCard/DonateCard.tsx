import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { type IProjects } from "~/src/types";

import { Button, eButtonSize } from "../Button";

import styles from "./DonateCard.module.scss";

export const DonateCard = ({ data }: { data: IProjects }) => {
  const t = useTranslations("projects");
  const router = useRouter();

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

  const handleDonateClick = () => {
    router.push(`?project=${data.id}`);
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
