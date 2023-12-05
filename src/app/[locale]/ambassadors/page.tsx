"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next-intl/client";

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

import { ambassadors } from "~/constants";

import styles from "./ambassadors.module.scss";
import Link from "next/link";

export default function Ambassadors() {
  const t = useTranslations("ambassadors");
  const pathname = usePathname();
  const router = useRouter();

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
        <ul className={styles.ambassadors}>
          {ambassadors.map((ambassador) => (
            <li className={styles.ambassador} key={ambassador}>
              <div className={styles.ambassador__image}>
                <Image
                  src={`https://paramar-foundation.sirv.com/Images/profile-${ambassador}.jpg`}
                  alt={ambassador}
                  loading="lazy"
                  width={300}
                  height={450}
                />
              </div>
              <div className={styles.ambassador__content}>
                <p className={styles.ambassador__name}>
                  {t(`${ambassador}.name`)}
                </p>
                <p className={styles.ambassador__role}>
                  {t(`${ambassador}.role`)}
                </p>
                <ul className={styles.ambassador__socials}>
                  {t(`${ambassador}.instagram`) !== "" && (
                    <li>
                      <Link href={t(`${ambassador}.instagram`)} target="_blank">
                        <Icon icon={eIcons.socialInstagram} />
                      </Link>
                    </li>
                  )}
                  {t(`${ambassador}.x`) !== "" && (
                    <li>
                      <Link href={t(`${ambassador}.instagram`)} target="_blank">
                        <Icon icon={eIcons.socialX} />
                      </Link>
                    </li>
                  )}
                  {t(`${ambassador}.linked-in`) !== "" && (
                    <li>
                      <Link href={t(`${ambassador}.instagram`)} target="_blank">
                        <Icon icon={eIcons.socialLinkedIn} />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </PageSection>
      <PageSection id="contact" bgDefaultColor="#1c1d20" isLastSection>
        <Contact />
      </PageSection>
      <Footer />
    </Main>
  );
}
