"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { api } from "~/src/trpc/react";

import { type IProject } from "~/src/types";

import { Icon, eIcons } from "../Icon";
import { Button, eButtonColor, eButtonType } from "../Button";

import styles from "./Project.module.scss";

export const Project = ({ data }: { data: IProject }) => {
  const t = useTranslations("projects");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceId, setPriceId] = useState("");
  const [totalDonated, setTotalDonated] = useState(0);
  const [isCopied, setCopied] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const queryParams = useSearchParams();
  const locale = useLocale();
  const createCheckoutMutation = api.payments.createCheckout.useMutation();

  const {
    image,
    donations,
    goal,
    _count: { donations: totalDonations },
  } = data;

  useEffect(() => {
    if (locale === "es" || locale === "en") {
      setTitle(data[`title_${locale}`]);
      setDescription(data[`description_${locale}`]);
      setPriceId(data[`stripe_price_id_${locale}`]);
    }
  }, [data, locale]);

  useEffect(() => {
    const total = donations.reduce((partialSum, a) => partialSum + a.amount, 0);
    setTotalDonated(total);
  }, [donations]);

  useEffect(() => {
    if (isCopied) {
      const interval = setInterval(setCopied, 5000, false);
      return () => clearInterval(interval);
    }
  }, [isCopied]);

  const handleCheckout = async () => {
    const checkout = await createCheckoutMutation.mutateAsync({
      priceId,
      projectId: data.id,
    });

    router.push(checkout.url!);
  };

  const copyToClip = () => {
    if (!isCopied) {
      setCopied(true);
      const url =
        window?.location.origin + pathName + `?${queryParams.toString()}`;
      void navigator.clipboard.writeText(url);
    }
  };

  const getProgressPercent = () => {
    return `${((totalDonated / goal) * 100).toFixed(0)}%`;
  };

  const renderData = () => {
    return (
      <>
        <p className={styles.content__data__summary}>
          <b>${Intl.NumberFormat().format(totalDonated)}</b> {t("raised")} $
          {Intl.NumberFormat().format(goal)}
        </p>
        <div className={styles.content__data__bar}>
          <div
            className={styles.content__data__progress}
            style={{ width: getProgressPercent() }}
          ></div>
        </div>
        <p className={styles.content__data__total}>
          {t.rich("total-donations", {
            total: totalDonations,
          })}
        </p>
      </>
    );
  };

  return (
    <article className={styles.project}>
      <div className={styles["mobile-image-container"]}>
        <Image
          src={image}
          alt={`${title} donation cover`}
          width={400}
          height={400}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        <div className={styles.content__description}>
          <div className={styles["content__description__image-container"]}>
            <Image
              src={image}
              alt={`${title} donation cover`}
              width={400}
              height={400}
            />
          </div>
          <div className={styles.content__description__caption}>
            <Icon icon={eIcons.hands} className={styles.icon} />
            <span>
              {t.rich("caption", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className={styles.content__data}>
          {renderData()}
          <Button
            type={isCopied ? eButtonType.tertiary : eButtonType.secondary}
            color={eButtonColor.white}
            fullWidth
            onClick={copyToClip}
          >
            {isCopied ? t("share-card-btn-copied") : t("share-card-btn")}
          </Button>
          <Button
            fullWidth
            onClick={() => handleCheckout().catch(console.error)}
          >
            {t("donate-card-btn")}
          </Button>
          <article className={styles.content__data__disclaimer}>
            <header
              dangerouslySetInnerHTML={{
                __html: t.raw("disclaimer-title") as string,
              }}
            />
            <p>{t("disclaimer-content")}</p>
          </article>
        </div>
      </div>
    </article>
  );
};
