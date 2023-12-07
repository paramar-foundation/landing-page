"use client";

import { type FormEvent, useState } from "react";

import { api } from "~/src/trpc/react";

import {
  Button,
  Main,
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

  const adminLoginMutation = api.admin.login.useMutation();

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
    <Main>
      <NavigationBar scrollThreshold={10} light />
      <PageSection isFirstSection className={styles.container}>
        <h2>Welcome Admins!</h2>
        {shouldDisplay ? (
          <AdminPanel />
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
  );
}
