"use client";

import React, { useRef, useState } from "react";

import { eInputTheme } from "../input";
import { Icon, eIcons } from "../../Icon";

import styles from "../Input.module.scss";

interface ISelectInputProps {
  label: string;
  name: string;
  options: string[];
  onChange: (value: string) => void;
  setError: (value: boolean) => void;
  value: string;
  form?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  theme: eInputTheme;
}

export const SelectInput = ({
  name,
  label,
  options,
  onChange,
  setError,
  value,
  theme,
  form = "",
  disabled = false,
  required = true,
  error = true,
}: ISelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setError(false);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const getFieldsetClassName = () => {
    const themeClass = {
      [eInputTheme.dark]: styles["fieldset--dark"],
      [eInputTheme.light]: styles["fieldset--light"],
    };

    const classes = [
      styles.fieldset,
      styles.select,
      themeClass[theme],
      isOpen && styles["fieldset--select-open"],
      error && styles["fieldset--error"],
      value !== "" && styles["fieldset--filled"],
    ];

    return classes.join(" ");
  };

  const getOptionsClassName = (option: string) => {
    const classes = [
      styles.option,
      value === option ? styles["option--selected"] : "",
    ];

    return classes.join(" ");
  };

  return (
    <fieldset
      className={getFieldsetClassName()}
      disabled={disabled}
      form={form}
      name={`${name}-fieldset`}
      onClick={() => toggleDropdown()}
      ref={selectRef}
    >
      <label htmlFor={`${name}-select`}>
        {label}
        {required && "*"}
      </label>
      <article>
        <span className={styles.select__selection}>
          {options.find((option) => option === value) ?? <>&nbsp;</>}
        </span>
      </article>
      <Icon icon={eIcons.chevronDown} className={styles.select__icon} />
      <ul
        className={styles.select__options}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className={getOptionsClassName(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
