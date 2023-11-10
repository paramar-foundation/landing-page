"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { TextInput, SelectInput } from "../../Input";
import { Button } from "../../Button";

import styles from "./Contact.module.scss";

export const Contact = () => {
  const t = useTranslations("contact-us");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(
      `Hi ${name} ${lastName}.\nWe will soon contact you to ${email} about: ${moreInfo}`
    );
    setName("");
    setLastName("");
    setEmail("");
    setMoreInfo("");
  };

  const formData = [
    {
      input: "name",
      value: name,
      setFunction: setName,
    },
    {
      input: "last-name",
      value: lastName,
      setFunction: setLastName,
    },
    {
      input: "email",
      value: email,
      setFunction: setEmail,
    },
  ] as const;

  const selectOptions = [
    "workshop",
    "good-practice",
    "therapy",
    "collaborate",
  ] as const;

  return (
    <article className={styles.contact}>
      <div className={styles.contact__content}>
        <h2 className={styles.contact__content__title}>{t("title")}</h2>
        <p className={styles.contact__content__body}>{t("description")}</p>
      </div>
      <form className={styles.contact__form} onSubmit={(e) => handleSubmit(e)}>
        {formData.map((data) => (
          <TextInput
            key={t(data.input)}
            label={t(data.input)}
            name={data.input}
            value={data.value}
            onChange={data.setFunction}
          />
        ))}
        <SelectInput
          label={t("information")}
          name="information"
          value={moreInfo}
          onChange={setMoreInfo}
          options={selectOptions.map((option) => t(`options.${option}`))}
        />
        <Button htmlType="submit" fullWidth>
          {t("send-btn")}
        </Button>
      </form>
      <Image
        className={styles["contact__paint-top"]}
        src="/paints/contact-top.png"
        alt="Paint splatter decoration"
        width={220}
        height={120}
      />
      <Image
        className={styles["contact__paint-bottom"]}
        src="/paints/contact-bottom.png"
        alt="Paint splatter decoration"
        width={360}
        height={200}
      />
    </article>
  );
};
