import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import ThemeProvider from "./context/ThemeProvider";
// import NotificationProver from "./context/NotificationProver";
import ContexProviders from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContexProviders>
    <App />
  </ContexProviders>
);
