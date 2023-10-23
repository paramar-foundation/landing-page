import { ReactElement } from "react";

import styles from "./PageSection.module.scss";

interface SectionProps {
  children?: ReactElement | string;
}

export const PageSection = ({ children }: SectionProps) => {
  return <section className={styles["page-section"]}>{children}</section>;
};
