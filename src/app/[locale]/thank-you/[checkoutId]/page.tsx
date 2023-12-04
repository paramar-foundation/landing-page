/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next-intl/client";
import { api } from "~/src/trpc/react";

import type Stripe from "stripe";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  Button,
  Footer,
  Main,
  NavigationBar,
  PageSection,
  eButtonType,
} from "../../components";
import Certificate from "./Certificate";

import styles from "./thank-you.module.scss";

export default function ThankYou({
  params: { checkoutId },
}: {
  params: { checkoutId: string };
}) {
  const t = useTranslations("thank-you");
  const [certificateDisplay, setCertificateDisplay] = useState("none");
  const [checkoutDetails, setCheckoutDetails] = useState(
    {} as Stripe.Response<Stripe.Checkout.Session>
  );
  const router = useRouter();
  const getCheckoutMutation = api.payments.getCheckoutDetails.useMutation();

  useEffect(() => {
    const getCheckoutDetails = async () => {
      const checkoutDetails = await getCheckoutMutation.mutateAsync({
        checkoutId,
      });

      if (checkoutDetails.id) {
        setCheckoutDetails(checkoutDetails);
      }
    };

    getCheckoutDetails().catch(() => {
      router.replace("/projects");
      console.error;
    });
  }, [checkoutId]);

  useEffect(() => {
    const height = 720;
    const width = 1280;
    const certificateElem = document.getElementById("certificate");
    if (
      certificateElem &&
      certificateDisplay === "block" &&
      checkoutDetails.id
    ) {
      html2canvas(certificateElem)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/jpg");
          const pdf = new jsPDF({
            orientation: "l",
            format: [width, height],
          });
          const { customer_details } = checkoutDetails;
          const customerName = customer_details?.name
            ?.toLocaleLowerCase()
            .replace(" ", "_");

          pdf.addImage(imgData, "JPEG", 0, 0, width, height, "", "FAST");
          pdf.save(`donation_certificate_${customerName}.pdf`);
          setCertificateDisplay("none");
        })
        .catch((e) => console.error(e));
    }
  }, [certificateDisplay]);

  return (
    <Main>
      <NavigationBar scrollThreshold={10} light />
      <PageSection isFirstSection isLastSection>
        <div className={styles.content}>
          <h1 className={styles.content__title}>
            {t.rich("title", {
              name: checkoutDetails.customer_details?.name,
              purple: (chunks) => <b>{chunks}</b>,
            })}
          </h1>
          <p className={styles.content__body}>{t("content")}</p>
          <div className={styles.content__buttons}>
            <Button
              type={eButtonType.secondary}
              fullWidth
              onClick={() => router.push("/projects")}
            >
              {t("back-cta")}
            </Button>
            <Button
              type={eButtonType.primary}
              fullWidth
              onClick={() => setCertificateDisplay("block")}
            >
              {t("share-cta")}
            </Button>
          </div>
          <div className={styles["content__paint-left"]}>
            <Image
              src="/paints/thank-you-page-left.png"
              alt="Paint splatter decoration"
              width={620}
              height={570}
            />
          </div>
          <div className={styles["content__paint-right"]}>
            <Image
              src="/paints/thank-you-page-right.png"
              alt="Paint splatter decoration"
              width={400}
              height={570}
            />
          </div>
        </div>
      </PageSection>
      <div
        style={{
          display: certificateDisplay,
          position: "absolute",
          zIndex: -9999,
          top: "100%",
        }}
      >
        <Certificate checkoutDetails={checkoutDetails} />
      </div>
      <Footer />
    </Main>
  );
}
