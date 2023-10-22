import { MouseEventHandler, ReactElement } from "react";

import styles from "./Button.module.scss";

export enum ButtonType {
  primary,
  secondary,
  tertiary,
}

export enum ButtonColor {
  purple,
  orange,
  white,
}

export enum ButtonSize {
  standard,
  small,
}

interface ButtonProps {
  children?: ReactElement | string;
  color?: ButtonColor;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    type = ButtonType.primary,
    color = ButtonColor.purple,
    size = ButtonSize.standard,
    fullWidth = false,
    disabled = false,
    onClick,
  } = props;

  const getClassName = () => {
    const disableString = disabled ? "disabled" : "active";
    const stylesCombination = {
      types: {
        [ButtonType.primary]: {
          [ButtonColor.purple]: {
            active: `${styles.button__primary} ${styles["button__primary--purple"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--purple-disabled"]}`,
          },
          [ButtonColor.orange]: {
            active: `${styles.button__primary} ${styles["button__primary--orange"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--orange-disabled"]}`,
          },
          [ButtonColor.white]: {
            active: `${styles.button__primary} ${styles["button__primary--white"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--white-disabled"]}`,
          },
        },
        [ButtonType.secondary]: {
          [ButtonColor.purple]: {
            active: `${styles.button__secondary} ${styles["button__secondary--purple"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--purple-disabled"]}`,
          },
          [ButtonColor.orange]: {
            active: `${styles.button__secondary} ${styles["button__secondary--orange"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--orange-disabled"]}`,
          },
          [ButtonColor.white]: {
            active: `${styles.button__secondary} ${styles["button__secondary--white"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--white-disabled"]}`,
          },
        },
        [ButtonType.tertiary]: {
          [ButtonColor.purple]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--purple"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--purple-disabled"]}`,
          },
          [ButtonColor.orange]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--orange"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--orange-disabled"]}`,
          },
          [ButtonColor.white]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--white"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--white-disabled"]}`,
          },
        },
      },
      size: {
        [ButtonSize.standard]: styles["button--standard"],
        [ButtonSize.small]: styles["button--small"],
      },
    };

    const classes = [
      styles.button,
      stylesCombination.types[type][color][disableString],
      stylesCombination.size[size],
      fullWidth ? styles["button--fullwidth"] : "",
    ];

    return classes.join(" ");
  };

  return (
    <button className={getClassName()} onClick={(e) => onClick && onClick(e)}>
      {children}
    </button>
  );
};
