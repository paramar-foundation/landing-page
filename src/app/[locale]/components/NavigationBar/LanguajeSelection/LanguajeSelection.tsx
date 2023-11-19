"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";

import { Icon, eIcons } from "../../Icon";

import styles from "../NavigationBar.module.scss";

interface ILanguageSelectionProps {
  isHidden?: boolean;
}

export const LanguageSelection = ({
  isHidden = false,
}: ILanguageSelectionProps) => {
  const [selectedLocale, setSelectedLocale] = useState(useLocale());
  const [isDisplayingOptions, setDisplayingOptions] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locales = ["es", "en"] as const;

  const handleSelect = (locale: string) => {
    setSelectedLocale(locale);
    setDisplayingOptions(false);
    router.replace(pathname, { locale, scroll: false });
  };

  const getClassName = () => {
    return isHidden
      ? styles["language-selection-responsive"]
      : styles["language-selection"];
  };

  return (
    <article className={getClassName()}>
      <div
        className={styles["language-selection__selected"]}
        onClick={() => setDisplayingOptions(!isDisplayingOptions)}
      >
        <p>{selectedLocale}</p>
        <Icon
          icon={eIcons.chevronDown}
          className={styles["language-selection__icon"]}
        />
      </div>
      {isDisplayingOptions && (
        <ul className={styles["language-selection__list"]}>
          {locales.map((locale) => (
            <li key={locale} onClick={() => handleSelect(locale)}>
              {locale}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
