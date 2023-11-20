import { type ReactNode } from "react";

import styles from "./PageSection.module.scss";

interface ISectionProps {
  id?: string;
  children?: ReactNode;
  bgDefaultColor?: string;
  bgImage?: string;
}

export const PageSection = ({
  id,
  children,
  bgDefaultColor = "#fff",
  bgImage,
}: ISectionProps) => {
  const getBgImage = () => {
    const styles = {} as { backgroundColor?: string; backgroundImage?: string };

    if (bgDefaultColor) styles.backgroundColor = bgDefaultColor;
    if (bgImage) styles.backgroundImage = `url(${bgImage})`;

    return styles;
  };
  return (
    <section className={styles["page-section"]} style={getBgImage()}>
      <div className={styles.anchor} id={id}></div>
      {children}
    </section>
  );
};
