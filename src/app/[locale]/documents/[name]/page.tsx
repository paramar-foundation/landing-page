"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import NotFoundPage from "../../not-found";
import {
  Footer,
  Icon,
  Main,
  NavigationBar,
  PageSection,
  eIcons,
} from "../../components";

import { documentsData } from "~/src/constants";
import styles from "./document.module.scss";

export default function Document({ params }: { params: { name: string } }) {
  const t = useTranslations("documents");

  const document = documentsData.find(({ name }) => name === params.name);

  if (!document) {
    return <NotFoundPage />;
  }

  return (
    <Main>
      <NavigationBar scrollThreshold={10} light />
      <PageSection isFirstSection isLastSection>
        <div className={styles.back}>
          <Link href="/documents" replace>
            <Icon icon={eIcons.arrowRight} />
            {t("go-back-link")}
          </Link>
        </div>
        <iframe
          className={styles.document}
          src={`/documents/${document.displayName}.pdf`}
        />
      </PageSection>
      <Footer />
    </Main>
  );
}
