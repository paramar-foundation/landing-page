"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { TextInput, SelectInput } from "../../Input";
import { eInputTheme } from "../../Input/input";
import { Button } from "../../Button";

import styles from "./Contact.module.scss";

import emailjs from "@emailjs/browser";

export const Contact = ({ hasSelect = true, pageType = "contact-us" }) => {
  const t = useTranslations(pageType);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [moreInfo, setMoreInfo] = useState(
    hasSelect ? "" : t("options.therapy")
  );
  const [isSending, setSending] = useState(false);
  const [isSent, setSent] = useState(false);
  const [isError, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      name: name,
      email: email,
      lastname: lastName,
      subject: moreInfo,
    };

    try {
      const { status } = await emailjs.send(
        "default_service",
        "template_efx47rn",
        templateParams,
        "SOs7nlEDZqSNcqyP_"
      );

      if (status === 200) {
        setSending(false);
        setSent(true);
        alert(
          `Hi ${name} ${lastName}.\nWe will soon contact you to ${email} about: ${moreInfo}`
        );
      } else {
        setSending(false);
        setError(true);
        alert(
          `Oops! Something went wrong with the contact form.\n Please try again later.`
        );
      }
    } catch (error) {
      setSending(false);
      setError(true);
      alert(
        `Oops! Something went wrong with the contact form.\n Please try again later.`
      );
    }

    setName("");
    setLastName("");
    setEmail("");
    setMoreInfo("");

    setTimeout(() => {
      setSent(false);
      setError(false);
    }, 1000 * 5);
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

  const renderContent = () => {
    if (isSending) {
      return <div className={styles.contact__content__body}>Sendind...</div>;
    } else if (isSent) {
      return (
        <div className={styles.contact__content__body}>
          Thank you for contacting us! <br />
          We will soon be contacting you.
        </div>
      );
    } else if (isError) {
      return (
        <div className={styles.contact__content__body}>
          Sorry! Something went wrong with the contact form. <br />
          Plase try again later.
        </div>
      );
    } else {
      return (
        <form
          className={styles.contact__form}
          onSubmit={(e) => handleSubmit(e)}
        >
          {formData.map((data) => (
            <TextInput
              key={t(data.input)}
              label={t(data.input)}
              name={data.input}
              value={data.value}
              onChange={data.setFunction}
              theme={eInputTheme.light}
            />
          ))}
          {hasSelect && (
            <SelectInput
              label={t("information")}
              name="information"
              value={moreInfo}
              onChange={setMoreInfo}
              options={selectOptions.map((option) => t(`options.${option}`))}
              theme={eInputTheme.light}
            />
          )}
          <Button htmlType="submit" fullWidth>
            {t("send-btn")}
          </Button>
        </form>
      );
    }
  };

  return (
    <article className={styles.contact}>
      <div className={styles.contact__content}>
        <h2 className={styles.contact__content__title}>{t("title")}</h2>
        <p className={styles.contact__content__body}>{t("description")}</p>
      </div>
      {renderContent()}
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
