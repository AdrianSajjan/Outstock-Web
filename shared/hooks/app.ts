import * as React from "react";
import { AppContext } from "@shared/context";

export const useAppContext = () => {
  const app = React.useContext(AppContext);
  return app;
};
