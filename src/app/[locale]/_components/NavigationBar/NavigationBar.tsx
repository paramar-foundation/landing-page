"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";

import { Logo, eLogoType } from "../Logo";
import { Icon, eIcons } from "../Icon";
import { Button, eButtonColor, eButtonType } from "../Button";

import styles from "./NavigationBar.module.scss";

const LanguageSelection = ({ isHidden = false }) => {
  const [selectedLocale, setSelectedLocale] = useState(useLocale());
  const [isDisplayingOptions, setDisplayingOptions] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locales = ["es", "en"] as const;

  const handleSelect = (locale: string) => {
    const scrollLocation = window.localStorage.getItem("scroll-location");
    setSelectedLocale(locale);
    setDisplayingOptions(false);
    router.replace(pathname + scrollLocation, { locale });
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
  const t = useTranslations("nav");
  const [logoType, setLogoType] = useState(eLogoType.white);
  const [isScroll, setScroll] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [secondaryCtaColor, setSecondaryCtaColor] = useState(
    eButtonColor.white
  );
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuItems = [
    "mission",
    "about-us",
    "why-us",
    "therapy",
    "faqs",
  ] as const;

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

  const handleLinkClick = (anchor: string) => {
    setMenuOpen(false);
    window.localStorage.setItem("scroll-location", anchor);
  };

  const handleCtaClick = (anchor: string) => {
    handleLinkClick(anchor);
    router.replace(pathname + anchor);
  };

  const renderMenu = (modifier = "", isResponsive = false) => {
    const style = `navigation-bar__menu-items${
      modifier !== "" ? `--${modifier}` : ""
    }`;

    return (
      <article className={styles[style]} ref={menuRef}>
        <ul>
          {menuItems.map((item) => {
            const anchor = `#${item}`;

            return (
              <li key={item} className={styles[item]}>
                <a onClick={() => handleLinkClick(anchor)} href={anchor}>
                  {t(item)}
                </a>
              </li>
            );
          })}
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
      <a
        className={styles["navigation-bar__logo-container"]}
        onClick={() => handleLinkClick("")}
        href=""
      >
        <Logo type={logoType} />
      </a>
      {renderMenu()}
      <section className={styles["navigation-bar__contents"]}>
        <div className={styles["navigation-bar__actions"]}>
          <LanguageSelection />
          <Button onClick={() => handleCtaClick("#projects")}>
            {t("donate")}
          </Button>
          <Button
            id={styles["more-info-btn"]}
            type={eButtonType.secondary}
            color={secondaryCtaColor}
            onClick={() => handleCtaClick("#projects")}
          >
            {t("more-info")}
          </Button>
        </div>
      </section>
      <section className={styles["navigation-bar__responsive-menu"]}>
        {renderMenu("responsive-menu", true)}
      </section>
    </header>
  );
};
