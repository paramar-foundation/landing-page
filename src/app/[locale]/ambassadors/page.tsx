"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next-intl/client";
import { api } from "~/src/trpc/react";

import {
  Button,
  Contact,
  Footer,
  Icon,
  Main,
  NavigationBar,
  PageSection,
  eButtonType,
  eIcons,
} from "../components";

import styles from "./ambassadors.module.scss";
import Link from "next/link";

export default function Ambassadors() {
  const t = useTranslations("ambassadors");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: ambassadors } = api.ambassador.getAll.useQuery();

  const renderAmbassadorCards = () => {
    return ambassadors?.map((ambassador) => {
      let role = "";

      if (locale === "es") {
        role = ambassador.role_es as string;
      } else {
        role = ambassador.role_en as string;
      }

      return (
        <li className={styles.ambassador} key={ambassador.id}>
          <div className={styles.ambassador__image}>
            <Image
              src={ambassador.picture as string}
              alt={`${ambassador.name} profile picture`}
              loading="lazy"
              width={300}
              height={450}
            />
          </div>
          <div className={styles.ambassador__content}>
            <p className={styles.ambassador__name}>{ambassador.name}</p>
            <p className={styles.ambassador__role}>{role}</p>
            <ul className={styles.ambassador__socials}>
              {ambassador.instagram && (
                <li>
                  <Link href={ambassador.instagram as string} target="_blank">
                    <Icon icon={eIcons.socialInstagram} />
                  </Link>
                </li>
              )}
              {ambassador.x && (
                <li>
                  <Link href={ambassador.x as string} target="_blank">
                    <Icon icon={eIcons.socialX} />
                  </Link>
                </li>
              )}
              {ambassador.linkedin && (
                <li>
                  <Link href={ambassador.linkedin as string} target="_blank">
                    <Icon icon={eIcons.socialLinkedIn} />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </li>
      );
    });
  };

  return (
    <Main>
      <NavigationBar scrollThreshold={10} light />
      <PageSection isFirstSection>
        <header className={styles.header}>
          <p className={styles.header__subtitle}>{t("subtitle")}</p>
          <h1 className={styles.header__title}>
            {t.rich("title", {
              purple: (chunks) => <b>{chunks}</b>,
            })}
          </h1>
          <p className={styles.header__content}>{t("content")}</p>
          <Button
            type={eButtonType.secondary}
            onClick={() => router.replace(pathname + "#contact")}
          >
            {t("section-cta")}
          </Button>
          <div className={styles["header__paint-left"]}>
            <Image
              src="/paints/ambassador-page-left.png"
              alt="Paint splatter decoration"
              width={400}
              height={400}
            />
          </div>
          <div className={styles["header__paint-right"]}>
            <Image
              src="/paints/ambassador-page-right.png"
              alt="Paint splatter decoration"
              width={400}
              height={400}
            />
          </div>
        </header>
        <ul className={styles.ambassadors}>{renderAmbassadorCards()}</ul>
      </PageSection>
      <PageSection id="contact" bgDefaultColor="#1c1d20" isLastSection>
        <Contact />
      </PageSection>
      <Footer />
    </Main>
  );
}
