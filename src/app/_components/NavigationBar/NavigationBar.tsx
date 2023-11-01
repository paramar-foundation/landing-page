"use client";

import { useEffect, useRef, useState } from "react";

import { Logo, eLogoType } from "../Logo";
import { Icon, eIcons } from "../Icon";
import { Button, eButtonColor, eButtonType } from "../Button";

import styles from "./NavigationBar.module.scss";
import { breakpoints } from "~/constants";

const LanguageSelection = ({ isHidden = false }) => {
  const [selectedLocale, setSelectedLocale] = useState("es");
  const [isDisplayingOptions, setDisplayingOptions] = useState(false);
  const locales = ["es", "en"] as const;

  const handleSelect = (locale: string) => {
    setSelectedLocale(locale);
    setDisplayingOptions(false);
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
        <Icon icon={eIcons.chevronDown} width={24} height={20} />
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

const Hamburguer = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const getClassName = () => {
    return [styles.hamburger, isOpen ? styles["hamburger--open"] : ""].join(
      " "
    );
  };

  return (
    <article className={getClassName()} onClick={onClick}>
      <div className={styles.hamburger__top}></div>
      <div className={styles.hamburger__middle}></div>
      <div className={styles.hamburger__bottom}></div>
    </article>
  );
};

export const NavigationBar = () => {
  const [logoType, setLogoType] = useState(eLogoType.white);
  const [isScroll, setScroll] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [secondaryCtaColor, setSecondaryCtaColor] = useState(
    eButtonColor.white
  );
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const getClassName = () => {
    return [
      styles["navigation-bar"],
      isScroll ? styles["navigation-bar--on-scroll"] : "",
      isMenuOpen ? styles["navigation-bar--menu-open"] : "",
    ].join(" ");
  };

  const handleScroll = () => {
    if (window.scrollY > 220) {
      setScroll(true);
      setSecondaryCtaColor(eButtonColor.purple);
      setLogoType(eLogoType.color);
    } else {
      setScroll(false);

      if (!isMenuOpen) {
        setSecondaryCtaColor(eButtonColor.white);
        setLogoType(eLogoType.white);
      }
    }
  };

  useEffect(() => {
    if (!isMenuOpen && !isScroll) {
      setLogoType(eLogoType.white);
      setSecondaryCtaColor(eButtonColor.white);
    } else {
      setLogoType(eLogoType.color);
      setSecondaryCtaColor(eButtonColor.purple);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const renderMenu = (modifier = "") => {
    return (
      <ul
        className={
          styles[
            `navigation-bar__menu-items${
              modifier !== "" ? `--${modifier}` : ""
            }`
          ]
        }
        ref={menuRef}
      >
        <li className={styles["mission"]}>
          <a href="">Misión</a>
        </li>
        <li className={styles["about-us"]}>
          <a href="">Sobre nosotras</a>
        </li>
        <li className={styles["why-us"]}>
          <a href="">¿Por qué nosotras</a>
        </li>
        <li className={styles["therapy"]}>
          <a href="">Terapia</a>
        </li>
        <li className={styles["faqs"]}>
          <a href="">FAQs</a>
        </li>
      </ul>
    );
  };

  return (
    <header className={getClassName()} ref={headerRef}>
      <Hamburguer
        isOpen={isMenuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      />
      <Logo type={logoType} />
      {renderMenu()}
      <section className={styles["navigation-bar__contents"]}>
        <div className={styles["navigation-bar__actions"]}>
          <LanguageSelection />
          <Button>Dona aquí</Button>
          <Button
            id={styles["more-info-btn"]}
            type={eButtonType.secondary}
            color={secondaryCtaColor}
          >
            Más información
          </Button>
        </div>
      </section>
      <section className={styles["navigation-bar__responsive-menu"]}>
        {renderMenu("responsive-menu")}
      </section>
    </header>
  );
};
