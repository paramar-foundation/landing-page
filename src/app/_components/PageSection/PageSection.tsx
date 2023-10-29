import { ReactElement } from "react";

import styles from "./PageSection.module.scss";

interface ISectionProps {
  children?: ReactElement | string;
  bgDefaultColor?: string;
  bgImage?: string;
}

export const PageSection = ({
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
      {children}
    </section>
  );
};
