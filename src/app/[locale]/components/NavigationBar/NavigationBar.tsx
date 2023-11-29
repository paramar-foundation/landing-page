"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Link from "next-intl/link";

import { Button, eButtonColor, eButtonType } from "../Button";
import { Logo, eLogoType } from "../Logo";
import { LanguageSelection } from "./LanguajeSelection";
import { Hamburguer } from "./Hamburger";

import styles from "./NavigationBar.module.scss";
import { MainScrollContext } from "~/src/contexts";

export const NavigationBar = ({ light = false, scrollThreshold = 220 }) => {
  const t = useTranslations("nav");
  const [isScroll, setScroll] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [logoType, setLogoType] = useState(
    light ? eLogoType.color : eLogoType.white
  );
  const [secondaryCtaColor, setSecondaryCtaColor] = useState(
    light ? eButtonColor.purple : eButtonColor.white
  );
  const router = useRouter();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const scroll = useContext(MainScrollContext);

  const menuItems = [
    { value: "home", link: "/" },
    { value: "ambassadors", link: "/ambassadors" },
    { value: "contact", link: "/contact" },
    { value: "faqs", link: "/faqs" },
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
      if (scroll > scrollThreshold) {
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
  }, [isMenuOpen, isScroll, light, scroll, scrollThreshold]);

  const handleProjectsCtaClick = () => {
    setMenuOpen(false);
    router.push("/projects");
  };

  const handleTherapyCtaClick = () => {
    setMenuOpen(false);
    router.push("/request-therapy");
  };

  const renderMenu = (modifier = "", isResponsive = false) => {
    const style = `navigation-bar__menu-items${
      modifier !== "" ? `--${modifier}` : ""
    }`;

    return (
      <article className={styles[style]} ref={menuRef}>
        <ul>
          {menuItems.map((item) => {
            return (
              <li key={item.value} className={styles[item.value]}>
                <Link onClick={() => setMenuOpen(false)} href={item.link}>
                  {t(item.value)}
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
              onClick={() => handleTherapyCtaClick()}
            >
              {t("request-therapy-cta")}
            </Button>
          </>
        )}
      </article>
    );
  };

  return (
    <header className={getClassName()} ref={headerRef}>
      <div className={styles["navigation-bar__wrapper"]}>
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
            <Button onClick={() => handleProjectsCtaClick()}>
              {t("projects-cta")}
            </Button>
            <Button
              id={styles["more-info-btn"]}
              type={eButtonType.secondary}
              color={secondaryCtaColor}
              onClick={() => handleTherapyCtaClick()}
            >
              {t("request-therapy-cta")}
            </Button>
          </div>
        </section>
        <section className={styles["navigation-bar__responsive-menu"]}>
          {renderMenu("responsive-menu", true)}
        </section>
      </div>
    </header>
  );
};
