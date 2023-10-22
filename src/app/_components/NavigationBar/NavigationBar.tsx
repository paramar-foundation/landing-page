"use client";

import { useEffect, useRef, useState } from "react";

import { Logo, LogoType } from "../Logo";
import { Icon, IconEnum } from "../Icon";
import { Button, ButtonColor, ButtonType } from "../Button";

const LanguageSelection = () => {
  const [selectedLocale, setSelectedLocale] = useState("es");
  const [isDisplayingOptions, setDisplayingOptions] = useState(false);
  const locales = ["es", "en"] as const;

  const handleSelect = (locale: string) => {
    setSelectedLocale(locale);
    setDisplayingOptions(false);
  };

  return (
    <div className="relative flex select-none items-center px-3 py-2 text-base  font-bold uppercase text-white">
      <div
        className=" flex cursor-pointer items-center px-3 py-2"
        onClick={() => setDisplayingOptions(!isDisplayingOptions)}
      >
        <p>{selectedLocale}</p>
        <Icon icon={IconEnum.chevronDown} width={5} height={5} />
      </div>
      {isDisplayingOptions && (
        <ul className="absolute top-[100%] w-20 rounded bg-grey-400 py-2 shadow">
          {locales.map((locale) => (
            <li
              className=" flex w-[100%] cursor-pointer justify-center bg-black px-3 py-2 hover:bg-grey-400"
              key={locale}
              onClick={() => handleSelect(locale)}
            >
              {locale}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Hamburguer = () => {
  return (
    <article className="flex w-8 flex-col justify-center gap-1.5">
      <div className="h-[3px] rounded bg-white"></div>
      <div className=" h-[3px] rounded bg-white"></div>
      <div className="h-[3px] rounded bg-white"></div>
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
    <header className="flex h-28 gap-16 bg-black px-16 py-8" ref={headerRef}>
      <Hamburguer />
      <Logo type={LogoType.white} />
      <section className="flex grow gap-12">
        <ul
          className="gap flex flex-grow flex-col items-center xl:flex-row"
          ref={menuRef}
        >
          {menuItems.map((menu) => (
            <li className="flex h-[100%] content-stretch gap-4" key={menu}>
              <a
                className="flex items-center whitespace-nowrap p-3 text-base font-bold text-white"
                href={"/"}
              >
                {menu}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-8">
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
