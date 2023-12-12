/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { api } from "~/src/trpc/react";
import Image from "next/image";

import type { ambassador } from "@prisma/client";
import { Ambassador } from "./Components/Ambassador";

import styles from "./admin.module.scss";
import { Button, eButtonColor, eButtonSize } from "../components";

export const AdminPanel = ({
  setModalContent,
}: {
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
}) => {
  const { data: ambassadors } = api.ambassador.getAll.useQuery();
  // const { data: projects } = api.projects.getAll.useQuery();

  const handleCreateAmbassador = () => {
    setModalContent(<Ambassador create />);
  };

  const handleOpenAmbassador = (ambassador: null | undefined | ambassador) => {
    if (!ambassador) return;
    setModalContent(<Ambassador ambassador={ambassador} />);
  };

  return (
    <article className={styles.admin}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.header__item}>Ambassadors</div>
          <div className={styles.header__item}>
            <Button
              color={eButtonColor.white}
              size={eButtonSize.small}
              onClick={handleCreateAmbassador}
            >
              + New Ambassador
            </Button>
          </div>
        </div>
        <div className={styles.body}>
          {ambassadors?.map((ambassador) => (
            <div className={styles.body__row} key={ambassador?.id}>
              <div className={styles.body__row__item}>
                <div className={styles["image-container"]}>
                  <Image
                    src={ambassador?.picture}
                    alt="picture"
                    width={60}
                    height={80}
                  />
                </div>
              </div>
              <div className={styles.body__row__item}>{ambassador?.name}</div>
              <div
                className={styles.body__row__item}
                onClick={() => handleOpenAmbassador(ambassador)}
              >
                View
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
