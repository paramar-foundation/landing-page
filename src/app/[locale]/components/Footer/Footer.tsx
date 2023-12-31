"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";

import { Logo, eLogoType } from "../Logo";
import { Icon, eIcons } from "../Icon";

import styles from "./Footer.module.scss";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <hr className={styles.footer__divider} />
      <article className={styles.footer__content}>
        <Link href="/">
          <Logo type={eLogoType.color} isResponsive={false} />
        </Link>
        <div className={styles.footer__rights}>
          <span>@2023 all rights reserved</span>
          <span>
            <b>Paramar Foundation</b>
          </span>
        </div>
        <ul className={styles.footer__socials}>
          <li>
            <Link
              href="https://www.linkedin.com/company/paramar-foundation/"
              target="_blank"
            >
              <Icon icon={eIcons.socialLinkedIn}></Icon>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/paramarfoundation/"
              target="_blank"
            >
              <Icon icon={eIcons.socialInstagram}></Icon>
            </Link>
          </li>
        </ul>
      </article>
      <p className={styles.footer__disclaimer}>
        {t.rich("tax-disclaimer", {
          docs: (chunks) => <Link href="/documents">{chunks}</Link>,
        })}
      </p>
    </footer>
  );
};
