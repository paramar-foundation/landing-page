"use client";

import { useEffect, useRef, useState } from "react";

import { Logo, eLogoType } from "../Logo";
import { Icon, eIcons } from "../Icon";
import { Button, eButtonColor, eButtonType } from "../Button";

import styles from "./NavigationBar.module.scss";

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

  useEffect(() => {
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

    const handleEscPress = (e: KeyboardEvent) => {
      console.log(e.key);

      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (!isMenuOpen && !isScroll) {
      setLogoType(eLogoType.white);
      setSecondaryCtaColor(eButtonColor.white);
    } else {
      setLogoType(eLogoType.color);
      setSecondaryCtaColor(eButtonColor.purple);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [isMenuOpen, isScroll]);

  const renderMenu = (modifier = "", isResponsive = false) => {
    return (
      <article
        className={
          styles[
            `navigation-bar__menu-items${
              modifier !== "" ? `--${modifier}` : ""
            }`
          ]
        }
        ref={menuRef}
      >
        <ul>
          <li className={styles.mission}>
            <a onClick={() => setMenuOpen(false)} href="#mission">
              Misión
            </a>
          </li>
          <li className={styles["about-us"]}>
            <a onClick={() => setMenuOpen(false)} href="#about-us">
              Sobre nosotras
            </a>
          </li>
          <li className={styles["why-us"]}>
            <a onClick={() => setMenuOpen(false)} href="#why-us">
              ¿Por qué nosotras?
            </a>
          </li>
          <li className={styles.therapy}>
            <a onClick={() => setMenuOpen(false)} href="#therapy">
              Terapia
            </a>
          </li>
          <li className={styles.faqs}>
            <a onClick={() => setMenuOpen(false)} href="#faqs">
              FAQs
            </a>
          </li>
        </ul>
        {isResponsive && (
          <>
            <LanguageSelection />
            <Button
              type={eButtonType.secondary}
              color={secondaryCtaColor}
              fullWidth
            >
              Más información
            </Button>
          </>
        )}
      </article>
    );
  };

  return (
    <header className={getClassName()} ref={headerRef}>
      <Hamburguer
        isOpen={isMenuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      />
      <div className={styles["navigation-bar__logo-container"]}>
        <Logo type={logoType} />
      </div>
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
        {renderMenu("responsive-menu", true)}
      </section>
    </header>
  );
};
