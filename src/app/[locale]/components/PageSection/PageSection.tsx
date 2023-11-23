import { type ReactNode } from "react";

import styles from "./PageSection.module.scss";

interface ISectionProps {
  id?: string;
  children?: ReactNode;
  bgDefaultColor?: string;
  bgImage?: string;
  isFirstSection?: boolean;
  isLastSection?: boolean;
}

export const PageSection = ({
  id,
  children,
  bgDefaultColor = "#fff",
  bgImage,
  isFirstSection = false,
  isLastSection = false,
}: ISectionProps) => {
  const getBg = () => {
    const styles = {} as { backgroundColor?: string; backgroundImage?: string };

    if (bgDefaultColor) styles.backgroundColor = bgDefaultColor;
    if (bgImage) styles.backgroundImage = `url(${bgImage})`;

    return styles;
  };

  const getClassName = () => {
    return [
      styles["page-section"],
      isFirstSection ? styles["page-section--first"] : "",
      isLastSection ? styles["page-section--last"] : "",
    ].join(" ");
  };

  return (
    <section className={getClassName()} style={getBg()}>
      <div className={styles.anchor} id={id}></div>
      {children}
    </section>
  );
};
