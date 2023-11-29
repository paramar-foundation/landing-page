"use client";

import { useTranslations } from "next-intl";

import { Footer, Main, NavigationBar, PageSection } from "../components";

import styles from "./legal.module.scss";

export default function FAQsPage() {
  const t = useTranslations("faqs");
  const totalFAQs = Array(15);

  for (let i = 0; i < totalFAQs.length; i++) {
    totalFAQs[i] = i + 1;
  }

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
          <h2 className={styles.documents__title}>{t("title")}</h2>
          <div className={styles.documents__list}>
            {/* {totalFAQs.map((faq) => (
              <Accordeon
                key={t(`${faq}.question`)}
                question={t(`${faq}.question`)}
                answer={t(`${faq}.answer`)}
              />
            ))} */}
          </div>
        </article>
      </PageSection>
      <Footer />
    </Main>
  );
}
