import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
} from "react";

import { useTranslations } from "next-intl";

import styles from "./Button.module.scss";
import React from "react";

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
  isLoading?: boolean;
  isSuccess?: boolean;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  id,
  children,
  type = eButtonType.primary,
  color = eButtonColor.purple,
  size = eButtonSize.standard,
  htmlType = "button",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  isSuccess = false,
  onClick,
}: IButtonProps) => {
  const t = useTranslations("generic");

  const getClassName = () => {
    const disableString = disabled ? "disabled" : "active";
    const stylesCombination = {
      types: {
        [eButtonType.primary]: {
          [eButtonColor.purple]: {
            active: `${styles.button__primary} ${styles["button__primary--purple"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--purple-disabled"]} ${styles["button--purple-disabled"]}`,
          },
          [eButtonColor.orange]: {
            active: `${styles.button__primary} ${styles["button__primary--orange"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--orange-disabled"]} ${styles["button--orange-disabled"]}`,
          },
          [eButtonColor.white]: {
            active: `${styles.button__primary} ${styles["button__primary--white"]}`,
            disabled: `${styles.button__primary} ${styles["button__primary--white-disabled"]} ${styles["button--white-disabled"]}`,
          },
        },
        [eButtonType.secondary]: {
          [eButtonColor.purple]: {
            active: `${styles.button__secondary} ${styles["button__secondary--purple"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--purple-disabled"]} ${styles["button--purple-disabled"]}`,
          },
          [eButtonColor.orange]: {
            active: `${styles.button__secondary} ${styles["button__secondary--orange"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--orange-disabled"]} ${styles["button--orange-disabled"]}`,
          },
          [eButtonColor.white]: {
            active: `${styles.button__secondary} ${styles["button__secondary--white"]}`,
            disabled: `${styles.button__secondary} ${styles["button__secondary--white-disabled"]} ${styles["button--white-disabled"]}`,
          },
        },
        [eButtonType.tertiary]: {
          [eButtonColor.purple]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--purple"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--purple-disabled"]} ${styles["button--purple-disabled"]}`,
          },
          [eButtonColor.orange]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--orange"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--orange-disabled"]} ${styles["button--orange-disabled"]}`,
          },
          [eButtonColor.white]: {
            active: `${styles.button__tertiary} ${styles["button__tertiary--white"]}`,
            disabled: `${styles.button__tertiary} ${styles["button__tertiary--white-disabled"]} ${styles["button--white-disabled"]}`,
          },
        },
      },
    };

    const classes = [
      styles.button,
      stylesCombination.types[type][color][disableString],
      styles[`button--${size}`],
      fullWidth && styles["button--fullwidth"],
      isLoading && styles["button--loading"],
      isSuccess && styles["button--success"],
    ];

    return classes.join(" ");
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.button__loader}>
          <div></div>
          <div></div>
        </div>
      );
    } else if (isSuccess) {
      return t("success-btn");
    } else {
      return children;
    }
  };

  return (
    <button
      id={id}
      className={getClassName()}
      onClick={(e) => onClick && onClick(e)}
      disabled={disabled}
      type={htmlType}
    >
      {renderContent()}
    </button>
  );
};
