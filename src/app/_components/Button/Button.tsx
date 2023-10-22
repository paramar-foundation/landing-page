import { MouseEventHandler, ReactElement } from "react";

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
    const styles = {
      types: {
        [ButtonType.primary]: {
          [ButtonColor.purple]: {
            active: "bg-purple text-white hover:bg-purple-800",
            disabled: "pointer-events-none bg-purple-300 text-white",
          },
          [ButtonColor.orange]: {
            active: "bg-orange text-white hover:bg-orange-800",
            disabled: "pointer-events-none bg-orange-300 text-white",
          },
          [ButtonColor.white]: {
            active: "bg-white text-purple hover:bg-purple-100",
            disabled: "pointer-events-none bg-grey-100 text-grey-400",
          },
        },
        [ButtonType.secondary]: {
          [ButtonColor.purple]: {
            active:
              "border-2 border-purple text-purple hover:border-purple-800 hover:text-purple-800",
            disabled: "border-2 border-purple-300 text-purple-300",
          },
          [ButtonColor.orange]: {
            active:
              "border-2 border-orange text-orange hover:border-orange-800 hover:text-orange-800",
            disabled: "border-2 border-orange-300 text-orange-300",
          },
          [ButtonColor.white]: {
            active:
              "border-2 border-white text-white hover:border-purple-100 hover:text-purple-100",
            disabled: "border-2 border-grey-100 text-grey-100",
          },
        },
        [ButtonType.tertiary]: {
          [ButtonColor.purple]: {
            active: "bg-transparent text-purple hover:text-purple-800",
            disabled: "bg-transparent text-purple-300",
          },
          [ButtonColor.orange]: {
            active: "bg-transparent color-orange hover:color-orange-800",
            disabled: "bg-transparent color-orange-300",
          },
          [ButtonColor.white]: {
            active: "bg-transparent color-white hover:color-purple-100",
            disabled: "bg-transparent color-grey-100",
          },
        },
      },
      size: {
        [ButtonSize.standard]: "py-4",
        [ButtonSize.small]: "py-2",
      },
    };

    const classes = [
      "flex items-center rounded whitespace-nowrap px-6 text-base leading-4",
      styles.types[type][color][disableString],
      styles.size[size],
      fullWidth ? "w-[100%]" : "",
    ];

    return classes.join(" ");
  };

  return (
    <button className={getClassName()} onClick={(e) => onClick && onClick(e)}>
      {children}
    </button>
  );
};
