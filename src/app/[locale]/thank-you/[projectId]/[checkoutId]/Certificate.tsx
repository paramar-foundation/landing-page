"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import type Stripe from "stripe";
import { api } from "~/src/trpc/react";
import { Logo } from "../../../components";

import styles from "./thank-you.module.scss";

function Certificate({
  checkoutDetails,
  projectId,
}: {
  checkoutDetails: Stripe.Checkout.Session;
  projectId: string;
}) {
  const t = useTranslations("certificate");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const locale = useLocale();

  const { data: project } = api.projects.findUnique.useQuery({
    projectId: Number(projectId),
  });

  useEffect(() => {
    if (project && (locale === "es" || locale === "en")) {
      setTitle(project[`title_${locale}`]);
      setDate(() => {
        const projectDate = new Date(project.createdAt);

        return [
          projectDate.getMonth() - 1,
          projectDate.getDate(),
          projectDate.getFullYear(),
        ].join("/");
      });
    }
  }, [project, locale]);

  return (
    <div id="certificate" className={styles.certificate}>
      <Logo isResponsive={false} />
      <h3 className={styles.certificate__subtitle}>{t("subtitle")}</h3>
      <h1 className={styles.certificate__title}>
        {checkoutDetails.customer_details?.name}
      </h1>
      <p className={styles.certificate__body}>{t("body")}</p>
      <p className={styles.certificate__details}>
        {t.rich("details", {
          date,
          amount: (Number(checkoutDetails.amount_total) / 100).toFixed(2),
          campaign: title,
        })}
      </p>
    </div>
  );
}

export default Certificate;
