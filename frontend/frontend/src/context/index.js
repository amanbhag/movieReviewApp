import React from "react";
import { BrowserRouter } from "react-router-dom";
import NotificationProver from "./NotificationProver";
import ThemeProvider from "./ThemeProvider";
import AuthProvier from "./AuthProvier";

const ContexProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <NotificationProver>
        <AuthProvier>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvier>{" "}
      </NotificationProver>
    </BrowserRouter>
  );
};

export default ContexProviders;
