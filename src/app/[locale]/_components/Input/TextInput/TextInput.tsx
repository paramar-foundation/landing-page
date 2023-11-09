import { eInputTheme } from "../index";
import styles from "../Input.module.scss";

interface ITextInputProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
  theme?: eInputTheme;
}

export const TextInput = ({
  name,
  label,
  onChange,
  value,
  form = "",
  disabled = false,
  required = true,
  theme = eInputTheme.light,
}: ITextInputProps) => {
  const getFieldsetClassName = () => {
    const themeClass = {
      [eInputTheme.dark]: styles["fieldset--dark"],
      [eInputTheme.light]: styles["fieldset--light"],
    };

    const classes = [
      styles.fieldset,
      themeClass[theme],
      value !== "" && styles["fieldset--filled"],
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
      <input
        name={`${name}-input`}
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </fieldset>
  );
};
