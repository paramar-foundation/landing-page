/* eslint-disable @typescript-eslint/no-unsafe-return */

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type Stripe from "stripe";

import { type IProject } from "~/src/types";

import { Icon, eIcons } from "../../Icon";
import { Button, eButtonColor, eButtonType } from "../../Button";

import styles from "./ProjectModal.module.scss";
import { api } from "~/src/trpc/react";

export const ProjectModal = ({ data }: { data: IProject }) => {
  const t = useTranslations("projects");
  const [checkoutDetails, setCheckoutDetails] = useState(
    {} as Stripe.Response<Stripe.Checkout.Session>
  );
  const [isSuccess, setSuccess] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const queryParams = useSearchParams();
  const createCheckoutMutation = api.payments.createCheckout.useMutation();
  const getCheckoutMutation = api.payments.getCheckoutDetails.useMutation();

  const { image, name, currentAmount, goalAmount, totalDonations } = data;

  useEffect(() => {
    if (isCopied) {
      const interval = setInterval(setCopied, 5000, false);
      return () => clearInterval(interval);
    }
  }, [isCopied]);

  useEffect(() => {
    const checkoutId = queryParams.get("checkout_id");
    const successValue = queryParams.get("success");

    if (checkoutId) {
      const getCheckoutDetails = async () => {
        const checkoutDetails = await getCheckoutMutation.mutateAsync({
          checkoutId,
        });

        if (checkoutDetails.id) {
          setCheckoutDetails(checkoutDetails);
          setSuccess(
            Boolean(successValue && successValue.toLowerCase() === "true")
          );
        }
      };

      getCheckoutDetails().catch(console.error);
    }
  }, [queryParams]);

  const handleCheckout = async () => {
    const checkout = await createCheckoutMutation.mutateAsync({
      priceId: "price_1OC6T4GF6B44pfYavboaPDTL",
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
    return `${((currentAmount / goalAmount) * 100).toFixed(0)}%`;
  };

  const renderData = () => {
    return (
      <>
        <p className={styles.content__data__summary}>
          <b>${Intl.NumberFormat().format(currentAmount)}</b> recolectados de $
          {Intl.NumberFormat().format(goalAmount)}
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

  const renderSuccess = () => {
    const { customer_details, amount_total } = checkoutDetails;
    return (
      <>
        <h3>Thank you</h3>
        <p>for your donation!</p>
        <p>{customer_details?.name}</p>
        {amount_total && <h3>${(amount_total / 100).toFixed(2)}</h3>}
      </>
    );
  };

  return (
    <article className={styles["project-modal"]}>
      <div className={styles["mobile-image-container"]}>
        <Image
          src={image}
          alt={`${name} donation cover`}
          width={400}
          height={400}
        />
      </div>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.content}>
        <div className={styles.content__description}>
          <div className={styles["content__description__image-container"]}>
            <Image
              src={image}
              alt={`${name} donation cover`}
              width={400}
              height={400}
            />
          </div>
          <div className={styles.content__description__caption}>
            <Icon icon={eIcons.hands} className={styles.icon} />
            <span>
              Paramar Foundation busca ofrecer apoyo psicológico gratuito a
              mujeres y niñas que hayan sido víctimas de agresiones sexuales en
              algún momento de su vida.
            </span>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod. tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod. tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className={styles.content__data}>
          {isSuccess ? renderSuccess() : renderData()}
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
