"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  Footer,
  Icon,
  Main,
  NavigationBar,
  PageSection,
  ProjectModal,
  eIcons,
} from "../components";

import styles from "./projects.module.scss";
import { donationsData } from "~/src/constants";

export default function Ambassadors() {
  const t = useTranslations("projects.page");

  return (
    <Main>
      <NavigationBar scrollThreshold={10} light />
      <PageSection isFirstSection isLastSection>
        <header className={styles.header}>
          <div className={styles.header__content}>
            <p className={styles.header__subtitle}>{t("title")}</p>
            <h2 className={styles.header__title}>{t("description")}</h2>
            <p className={styles.header__body}>{t("content")}</p>
            <Icon icon={eIcons.arrowDown} />
          </div>
          <div className={styles["header__image-container"]}>
            <Image
              src="/paints/planet-artist-half.png"
              alt="Paint Decoration"
              loading="lazy"
              width={300}
              height={250}
              className={styles["paint-top"]}
            />
            <Image
              src="/mission-section.jpg"
              alt="Three women"
              width={530}
              height={370}
            />
            <Image
              src="/paints/planet-artist.png"
              alt="Paint Decoration"
              loading="lazy"
              width={320}
              height={350}
              className={styles["paint-bottom"]}
            />
          </div>
        </header>
        <hr className={styles.divider} />
        <article className={styles.content}>
          <ProjectModal data={donationsData[1]!} />
        </article>
      </PageSection>
      <Footer />
    </Main>
  );
}
