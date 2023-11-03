import { type ReactElement } from "react";

import styles from "./PageSection.module.scss";

interface ISectionProps {
  id?: string;
  children?: ReactElement | string;
  bgDefaultColor?: string;
  bgImage?: string;
}

export const PageSection = ({
  id,
  children,
  bgDefaultColor = "$color-white",
  bgImage,
}: ISectionProps) => {
  const getBgImage = () => {
    if (bgImage) {
      return {
        backgroundColor: bgDefaultColor,
        backgroundImage: `url(${bgImage})`,
      };
    }

    return {};
  };
  return (
    <section className={styles["page-section"]} style={getBgImage()}>
      <div className={styles.anchor} id={id}></div>
      {children}
    </section>
  );
};
