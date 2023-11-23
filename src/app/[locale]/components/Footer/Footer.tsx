"use client";

import { useTranslations } from "next-intl";

import { Logo, eLogoType } from "../Logo";
import { Icon, eIcons } from "../Icon";

import styles from "./Footer.module.scss";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <hr className={styles.footer__divider} />
      <article className={styles.footer__content}>
        <Logo type={eLogoType.color} isResponsive={false} />
        <div className={styles.footer__rights}>
          <span>@2023 all rights reserved</span>
          <span>
            <b>Paramar Foundation</b>
          </span>
        </div>
        <ul className={styles.footer__socials}>
          <li>
            <a href="">
              <Icon icon={eIcons.socialLinkedIn}></Icon>
            </a>
          </li>
          <li>
            <a href="">
              <Icon icon={eIcons.socialInstagram}></Icon>
            </a>
          </li>
        </ul>
      </article>
      <p className={styles.footer__disclaimer}>{t("tax-disclaimer")}</p>
    </footer>
  );
};
