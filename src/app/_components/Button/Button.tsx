import { MouseEventHandler, ReactElement } from "react";

import styles from "./Button.module.scss";

export enum eButtonType {
  primary,
  secondary,
  tertiary,
}

export enum eButtonColor {
  purple,
  orange,
  white,
}

export enum eButtonSize {
  standard = "standard",
  small = "small",
}

interface IButtonProps {
  id?: string;
  children?: ReactElement | string;
  color?: eButtonColor;
  size?: eButtonSize;
  type?: eButtonType;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  id,
  children,
  type = eButtonType.primary,
  color = eButtonColor.purple,
  size = eButtonSize.standard,
  fullWidth = false,
  disabled = false,
  onClick,
}: IButtonProps) => {
  const getClassName = () => {
    const disableString = disabled ? "disabled" : "active";
    const stylesCombination = {
      types: {
        [eButtonType.primary]: {
          [eButtonColor.purple]: {
            active: `${styles.button__primary} ${styles["button__primary--purple"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--purple-disabled"]}`,
          },
          [eButtonColor.orange]: {
            active: `${styles.button__primary} ${styles["button__primary--orange"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--orange-disabled"]}`,
          },
          [eButtonColor.white]: {
            active: `${styles.button__primary} ${styles["button__primary--white"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--white-disabled"]}`,
          },
        },
        [eButtonType.secondary]: {
          [eButtonColor.purple]: {
            active: `${styles.button__secondary} ${styles["button__secondary--purple"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--purple-disabled"]}`,
          },
          [eButtonColor.orange]: {
            active: `${styles.button__secondary} ${styles["button__secondary--orange"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--orange-disabled"]}`,
          },
          [eButtonColor.white]: {
            active: `${styles.button__secondary} ${styles["button__secondary--white"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--white-disabled"]}`,
          },
        },
        [eButtonType.tertiary]: {
          [eButtonColor.purple]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--purple"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--purple-disabled"]}`,
          },
          [eButtonColor.orange]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--orange"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--orange-disabled"]}`,
          },
          [eButtonColor.white]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--white"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--white-disabled"]}`,
          },
        },
      },
    };

    const classes = [
      styles.button,
      stylesCombination.types[type][color][disableString],
      styles[`button--${size}`],
      fullWidth ? styles["button--fullwidth"] : "",
    ];

    return classes.join(" ");
  };

  return (
    <button
      id={id}
      className={getClassName()}
      onClick={(e) => onClick && onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
