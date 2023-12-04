import { useTranslations } from "next-intl";

import type Stripe from "stripe";

import styles from "./thank-you.module.scss";
import { Logo } from "../../components";

function Certificate({
  checkoutDetails,
}: {
  checkoutDetails: Stripe.Checkout.Session;
}) {
  const t = useTranslations("certificate");

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
          amount: (Number(checkoutDetails.amount_total) / 100).toFixed(2),
          campaign: "Campaign",
          date: "Fecha",
        })}
      </p>
    </div>
  );
}

export default Certificate;
