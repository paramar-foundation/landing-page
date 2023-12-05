"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { api } from "~/src/trpc/react";
import {
  Footer,
  Main,
  NavigationBar,
  PageSection,
  Project,
} from "../components";

import styles from "./projects.module.scss";

export default function ProjectsPage() {
  const t = useTranslations("projects.page");
  const { data: projects } = api.projects.getAll.useQuery();

  return (
    <Main>
      <NavigationBar scrollThreshold={10} />
      <PageSection bgImage="/bg-projects-page.jpg">
        <div className={styles.header}>
          <div className={styles.header__content}>
            <p className={styles.header__content__subtitle}>{t("title")}</p>
            <h2 className={styles.header__content__title}>
              {t("description")}
            </h2>
            <p className={styles.header__content__body}>{t("content")}</p>
          </div>
          <Image
            className={styles.header__paint}
            src={"/paints/hero.png"}
            alt="Paint splatter decoration"
            width={300}
            height={300}
          />
        </div>
      </PageSection>
      <PageSection className={styles.content} isLastSection>
        {projects
          ?.filter((project) => !project.is_test)
          .map((project, index) => (
            <Fragment key={project.id}>
              {projects.length > 1 && index !== 0 && <hr />}
              <Project data={project} />
            </Fragment>
          ))}
      </PageSection>
      <Footer />
    </Main>
  );
}
