/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SetStateAction, Dispatch } from "react";
import { createContext } from "react";

export const ModalContext = createContext({
  content: null as null | string | React.ReactNode,
  setContent: (() => null) as Dispatch<SetStateAction<any>>,
});

export const MainScrollContext = createContext(0);
