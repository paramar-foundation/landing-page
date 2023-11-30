"use client";

import Link from "next-intl/link";
import { useTranslations } from "next-intl";

import {
  Footer,
  Icon,
  Main,
  NavigationBar,
  PageSection,
  eIcons,
} from "../components";

import styles from "./documents.module.scss";
import { documentsData } from "~/src/constants";

export default function Files() {
  const t = useTranslations("documents");

  return (
    <Main>
      <NavigationBar scrollThreshold={10} light />
      <PageSection
        bgImage="/paints/faqs-banner.jpg"
        bgDefaultColor="#1c1d20"
        isFirstSection
      >
        <div className={styles.header} />
      </PageSection>
      <PageSection isLastSection>
        <article className={styles.documents}>
          <div className={styles.documents__content}>
            <h2 className={styles.documents__title}>{t("title")}</h2>
            <p className={styles.documents__update}>
              {t.rich("last-update", { date: "12/10/2023" })}
            </p>
          </div>
          <ul className={styles.documents__list}>
            {documentsData.map(({ name, displayName }) => (
              <li key={name} className={styles.link}>
                <hr />
                <Link href={"/documents/" + name} className={styles.link__main}>
                  <Icon icon={eIcons.arrowRight} />
                  <p className={styles.link__name}>{displayName}</p>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </PageSection>
      <Footer />
    </Main>
  );
}
