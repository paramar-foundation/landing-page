/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type FormEvent, useEffect, useState } from "react";
import Image from "next/image";

import type { ambassador } from "@prisma/client";
import { api } from "~/src/trpc/react";

import styles from "./Ambassador.module.scss";
import {
  Button,
  TextArea,
  TextInput,
  eButtonColor,
  eInputTheme,
} from "../../../components";

export const Ambassador = ({
  ambassador,
  create = false,
}: {
  ambassador?: ambassador;
  create?: boolean;
}) => {
  const [name, setName] = useState(ambassador?.name ?? "");
  const [picture, setPicture] = useState(ambassador?.picture ?? "");
  const [linkedin, setLinkedin] = useState(ambassador?.linkedin ?? "");
  const [instagram, setInstagram] = useState(ambassador?.instagram ?? "");
  const [x, setX] = useState(ambassador?.x ?? "");
  const [roleEN, setRoleEN] = useState(ambassador?.role_en ?? "");
  const [quoteEN, setQuoteEN] = useState(ambassador?.quote_en ?? "");
  const [roleES, setRoleES] = useState(ambassador?.role_es ?? "");
  const [quoteES, setQuoteES] = useState(ambassador?.quote_es ?? "");
  const [isLoading, setLoading] = useState(false);
  const [isDifferent, setDifferent] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const createOrUpdateMutation = api.ambassador.createOrUpdate.useMutation();
  const deleteMutation = api.ambassador.delete.useMutation();

  useEffect(() => {
    if (!create) {
      if (
        name !== (ambassador?.name ?? "") ||
        picture !== (ambassador?.picture ?? "") ||
        linkedin !== (ambassador?.linkedin ?? "") ||
        instagram !== (ambassador?.instagram ?? "") ||
        x !== (ambassador?.x ?? "") ||
        roleEN !== (ambassador?.role_en ?? "") ||
        quoteEN !== (ambassador?.quote_en ?? "") ||
        roleES !== (ambassador?.role_es ?? "") ||
        quoteES !== (ambassador?.quote_es ?? "")
      ) {
        setDifferent(true);
      }
    } else {
      if (
        name !== "" &&
        picture !== "" &&
        String(picture).includes(
          "https://paramar-foundation.sirv.com/Images/ambassadors"
        ) &&
        roleEN !== "" &&
        quoteEN !== "" &&
        roleES !== "" &&
        quoteES !== ""
      ) {
        setFilled(true);
      }
    }
  }, [instagram, linkedin, name, picture, quoteEN, quoteES, roleEN, roleES, x]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!isDifferent) return;

    setLoading(true);

    await createOrUpdateMutation.mutateAsync({
      name,
      picture,
      linkedin,
      instagram,
      x,
      roleEN,
      quoteEN,
      roleES,
      quoteES,
      id: ambassador?.id ?? 0,
    });

    setLoading(false);
    setDifferent(false);
  };

  const handleStartDelete = () => {
    setDeleting(true);

    setTimeout(setDeleting, 1000, false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteMutation.mutateAsync({ id: ambassador?.id ?? 0 });
    setLoading(false);
  };

  return (
    <form className={styles.ambassador} onSubmit={handleSave}>
      <header>
        <div className={styles["image-container"]}>
          {ambassador ? (
            <Image
              src={ambassador.picture}
              alt="profile-picture"
              width={300}
              height={400}
            />
          ) : (
            <div>+</div>
          )}
        </div>
        <div>
          <h3>{ambassador?.name ?? "New Ambassador"}</h3>
          <p>{ambassador?.role_en ?? "-"}</p>
          <p>{ambassador?.role_es ?? "-"}</p>
        </div>
      </header>

      <div className={styles.ambassador__common}>
        <h5>Common</h5>
        <div className={styles.data}>
          <TextInput
            label="Name"
            name="name"
            value={name}
            onChange={setName}
            theme={eInputTheme.dark}
          />
          <TextInput
            label="Profile Picture"
            name="picture"
            type="url"
            value={picture}
            onChange={setPicture}
            theme={eInputTheme.dark}
          />
          <TextInput
            label="Linked In"
            name="linked"
            required={false}
            value={linkedin}
            onChange={setLinkedin}
            theme={eInputTheme.dark}
          />
          <TextInput
            label="Instagram"
            name="instagram"
            required={false}
            value={instagram}
            onChange={setInstagram}
            theme={eInputTheme.dark}
          />
          <TextInput
            label="X"
            name="x"
            required={false}
            value={x}
            onChange={setX}
            theme={eInputTheme.dark}
          />
        </div>
      </div>
      <div className={styles.ambassador__content}>
        <div className={styles.ambassador__content__english}>
          <h5>English</h5>
          <div className={styles.data}>
            <TextInput
              label="Role (EN)"
              name="role-en"
              value={roleEN}
              onChange={setRoleEN}
              theme={eInputTheme.dark}
            />
            <TextArea
              label="Quote (EN)"
              name="quote-en"
              value={quoteEN}
              onChange={setQuoteEN}
              theme={eInputTheme.dark}
            />
          </div>
        </div>
        <div className={styles.ambassador__content__divisor} />
        <div className={styles.ambassador__content__spanish}>
          <h5>Spanish</h5>
          <div className={styles.data}>
            <TextInput
              label="Role (ES)"
              name="role-es"
              value={roleES}
              onChange={setRoleES}
              theme={eInputTheme.dark}
            />
            <TextArea
              label="Quote (ES)"
              name="quote-es"
              value={quoteES}
              onChange={setQuoteES}
              theme={eInputTheme.dark}
            />
          </div>
        </div>
      </div>
      <div className={styles.ambassador__buttons}>
        <Button
          isLoading={isLoading}
          disabled={create ? !isFilled : !isDifferent}
          htmlType="submit"
        >
          Save Ambassador
        </Button>
        {!create && (
          <Button
            isLoading={isLoading}
            onClick={isDeleting ? handleDelete : handleStartDelete}
            color={isDeleting ? eButtonColor.orange : eButtonColor.purple}
          >
            {isDeleting ? "Are you sure? Click again" : "Delete Ambassador"}
          </Button>
        )}
      </div>
    </form>
  );
};
