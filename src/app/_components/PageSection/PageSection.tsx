import { ReactElement } from "react";

import styles from "./PageSection.module.scss";

interface ISectionProps {
  children?: ReactElement | string;
}

export const PageSection = ({ children }: ISectionProps) => {
  return <section className={styles["page-section"]}>{children}</section>;
};
