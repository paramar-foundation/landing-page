import { eInputTheme } from "../input";
import styles from "../Input.module.scss";

interface ITextAreaProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
  theme: eInputTheme;
}

export const TextArea = ({
  name,
  label,
  onChange,
  value,
  theme,
  form = "",
  disabled = false,
  required = true,
}: ITextAreaProps) => {
  const getFieldsetClassName = () => {
    const themeClass = {
      [eInputTheme.dark]: styles["fieldset--dark"],
      [eInputTheme.light]: styles["fieldset--light"],
    };

    const classes = [
      styles.fieldset,
      themeClass[theme],
      value !== "" && styles["fieldset--filled"],
      disabled && styles["fieldset--disabled"],
    ];

    return classes.join(" ");
  };

  return (
    <fieldset
      className={getFieldsetClassName()}
      disabled={disabled}
      form={form}
      name={`${name}-fieldset`}
    >
      <label htmlFor={`${name}-input`}>
        {label}
        {required && "*"}
      </label>
      <textarea
        name={`${name}-input`}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        rows={5}
      />
    </fieldset>
  );
};
