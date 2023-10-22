"use client";

import { useEffect, useRef, useState } from "react";

import { Logo, LogoType } from "../Logo";
import { Icon, IconEnum } from "../Icon";
import { Button, ButtonColor, ButtonType } from "../Button";

import styles from "./NavigationBar.module.scss";

const LanguageSelection = () => {
  const [selectedLocale, setSelectedLocale] = useState("es");
  const [isDisplayingOptions, setDisplayingOptions] = useState(false);
  const locales = ["es", "en"] as const;

  const handleSelect = (locale: string) => {
    setSelectedLocale(locale);
    setDisplayingOptions(false);
  };

  return (
    <article className={styles["language-selection"]}>
      <div
        className={styles["language-selection__selected"]}
        onClick={() => setDisplayingOptions(!isDisplayingOptions)}
      >
        <p>{selectedLocale}</p>
        <Icon icon={IconEnum.chevronDown} width={5} height={5} />
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

const Hamburguer = () => {
  return (
    <article className={styles.hamburger}>
      <div className={styles.hamburger__top}></div>
      <div className={styles.hamburger__middle}></div>
      <div className={styles.hamburger__bottom}></div>
    </article>
  );
};

export const NavigationBar = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuItems = [
    "Mision",
    "Sobre Nosotras",
    "Por qué nosotras?",
    "Terapia",
    "FAQs",
  ] as const;

  useEffect(() => {
    if (headerRef.current) {
      console.log((headerRef.current as HTMLSelectElement).offsetWidth);
    }
  });

  return (
    <header className={styles["navigation-bar"]} ref={headerRef}>
      <Hamburguer />
      <Logo type={LogoType.white} />
      <section className={styles["navigation-bar__contents"]}>
        <ul className={styles["navigation-bar__menu-items"]} ref={menuRef}>
          {menuItems.map((menu) => (
            <li key={menu}>
              <a href={"/"}>{menu}</a>
            </li>
          ))}
        </ul>
        <div className={styles["navigation-bar__actions"]}>
          <LanguageSelection />
          <Button>Dona aquí</Button>
          <Button type={ButtonType.secondary} color={ButtonColor.white}>
            Más información
          </Button>
        </div>
      </section>
    </header>
  );
};
