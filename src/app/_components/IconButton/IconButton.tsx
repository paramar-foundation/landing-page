import { type MouseEventHandler } from "react";

import { Icon, eIcons } from "../Icon";

import styles from "./IconButton.module.scss";

export enum eIconButtonType {
  previous = "previous",
  next = "next",
}

interface IIconButtonProps {
  type: eIconButtonType;
  disabled?: boolean;
  rounded?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = ({
  type,
  disabled = false,
  rounded = false,
  onClick,
}: IIconButtonProps) => {
  const getClassName = () => {
    const classes = [
      styles["icon-button"],
      styles[`icon-button--${type}`],
      disabled ? styles["icon-button--disabled"] : "",
      rounded ? styles["icon-button--rounded"] : "",
    ];

    return classes.join(" ");
  };

  return (
    <button className={getClassName()} onClick={(e) => onClick && onClick(e)}>
      <Icon icon={eIcons.chevronDown} />
    </button>
  );
};
