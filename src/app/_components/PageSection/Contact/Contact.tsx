"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

import styles from "./Contact.module.scss";
import { TextInput } from "../../Input";
import { Button } from "../../Button";
import { SelectInput } from "../../Input/SelectInput/SelectInput";

export const Contact = () => {
  const selectOptions = [
    "Taller de sensibilización",
    "Buenas prácticas para tu institución",
    "Terapia personal paga",
    "Colabora con nosotras",
  ];
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <article className={styles.contact}>
      <div className={styles.contact__content}>
        <h2 className={styles.contact__content__title}>Contáctanos</h2>
        <p className={styles.contact__content__body}>
          ¿Buscas un taller de sensibilización y buenas prácticas para tu
          empresa, terapia personal o quieres colaborar con nosotras?
        </p>
      </div>
      <form className={styles.contact__form} onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          label="Nombre(s)"
          name="name"
          value={name}
          onChange={setName}
        />
        <TextInput
          label="Apellido(s)"
          name="lastName"
          value={lastName}
          onChange={setLastName}
        />
        <TextInput
          label="Correo Electronico"
          name="email"
          value={email}
          onChange={setEmail}
        />
        <SelectInput
          label="¿Que información buscas?"
          name="information"
          value={moreInfo}
          onChange={setMoreInfo}
          options={selectOptions}
        />
        <Button htmlType="submit" fullWidth>
          Enviar
        </Button>
      </form>
      <Image
        className={styles["contact__paint-top"]}
        src="/paint-contact-top.png"
        alt="Paint splatter decoration"
        width={220}
        height={120}
      />
      <Image
        className={styles["contact__paint-bottom"]}
        src="/paint-contact-bottom.png"
        alt="Paint splatter decoration"
        width={360}
        height={200}
      />
    </article>
  );
};
