"use client";

import { type FormEvent, useState, useEffect } from "react";

import { api } from "~/src/trpc/react";

import { ModalContext } from "~/src/contexts";
import {
  Button,
  Main,
  Modal,
  NavigationBar,
  PageSection,
  TextInput,
} from "../components";
import { eInputTheme } from "../components/Input/input";

import { AdminPanel } from "./AdminPanel";
import styles from "./admin.module.scss";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [shouldDisplay, setDisplay] = useState(false);
  const [modalContent, setModalContent] = useState<null | React.ReactNode>(
    null
  );
  const adminLoginMutation = api.admin.login.useMutation();

  useEffect(() => {
    setModalContent(modalContent);
  }, [modalContent]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await adminLoginMutation.mutateAsync({ password });

    if (success) {
      setLogged(true);

      setTimeout(() => {
        setDisplay(true);
      }, 1000 * 1);
    } else {
      alert("Oops, wrong password");
    }

    setPassword("");
    setLoading(false);
  };

  return (
    <ModalContext.Provider
      value={{ content: modalContent, setContent: setModalContent }}
    >
      <Main>
        <NavigationBar scrollThreshold={10} light />
        <PageSection isFirstSection className={styles.container}>
          <h2>Welcome Admins!</h2>
          {shouldDisplay ? (
            <AdminPanel setModalContent={setModalContent} />
          ) : (
            <form
              className={styles["login-form"]}
              onSubmit={(e) => handleSubmit(e)}
            >
              <TextInput
                label="password"
                name="password"
                type="password"
                theme={eInputTheme.dark}
                value={password}
                onChange={setPassword}
              />
              <Button
                htmlType="submit"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                isSuccess={isLogged}
              >
                Login
              </Button>
            </form>
          )}
        </PageSection>
      </Main>
      {modalContent && <Modal />}
    </ModalContext.Provider>
  );
}
