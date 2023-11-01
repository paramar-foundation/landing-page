import styles from "./DonateCard.module.scss";
import { Button, eButtonSize } from "../Button";
import Image from "next/image";

interface IDonateCardProps {
  data:
    | {
        image: string;
        location: string;
        name: string;
        description: string;
        lastDonation: string;
        currentAmount: number;
        goalAmount: number;
      }
    | undefined;
}

export const DonateCard = ({ data }: IDonateCardProps) => {
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
        <Image src={image} alt={`${name} donation cover`} />
      </div>
      <div className={styles.content}>
        <p className={styles.content__location}>{location}</p>
        <p className={styles.content__name}>{name}</p>
        <p className={styles.content__description}>{description}</p>
        <p className={styles.content__last}>{lastDonation}</p>
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
          Donar Ahora
        </Button>
      </div>
    </article>
  );
};
