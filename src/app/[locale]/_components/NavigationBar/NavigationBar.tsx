"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import Link from "next-intl/link";

import { Button, eButtonColor, eButtonType } from "../Button";
import { Logo, eLogoType } from "../Logo";
import { LanguageSelection } from "./LanguajeSelection";
import { Hamburguer } from "./Hamburger";

import styles from "./NavigationBar.module.scss";
import { MainScrollContext } from "~/src/contexts";

export const NavigationBar = ({ light = false }) => {
  const t = useTranslations("nav");
  const [isScroll, setScroll] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [logoType, setLogoType] = useState(
    light ? eLogoType.color : eLogoType.white
  );
  const [secondaryCtaColor, setSecondaryCtaColor] = useState(
    light ? eButtonColor.purple : eButtonColor.white
  );
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const scroll = useContext(MainScrollContext);

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
      light ? styles["navigation-bar--light"] : "",
      isScroll ? styles["navigation-bar--on-scroll"] : "",
      isMenuOpen ? styles["navigation-bar--menu-open"] : "",
    ].join(" ");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scroll > 220) {
        setScroll(true);
        setSecondaryCtaColor(eButtonColor.purple);
        setLogoType(eLogoType.color);
      } else {
        setScroll(false);

        if (!isMenuOpen && !light) {
          setSecondaryCtaColor(eButtonColor.white);
          setLogoType(eLogoType.white);
        }
      }
    };

    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (light) {
      setLogoType(eLogoType.color);
      setSecondaryCtaColor(eButtonColor.purple);
    } else if (!isMenuOpen && !isScroll) {
      setLogoType(eLogoType.white);
      setSecondaryCtaColor(eButtonColor.white);
    } else {
      setLogoType(eLogoType.color);
      setSecondaryCtaColor(eButtonColor.purple);
    }

    handleScroll();

    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [isMenuOpen, isScroll, light, scroll]);

  const handleCtaClick = (anchor: string) => {
    setMenuOpen(false);
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
            const anchor = `/#${item}`;

            return (
              <li key={item} className={styles[item]}>
                <Link onClick={() => setMenuOpen(false)} href={anchor}>
                  {t(item)}
                </Link>
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
              onClick={() => handleCtaClick("#projects")}
            >
              {t("more-info")}
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
      <Link
        href="/"
        className={styles["navigation-bar__logo-container"]}
        onClick={() => setMenuOpen(false)}
      >
        <Logo type={logoType} />
      </Link>
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
