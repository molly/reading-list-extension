import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import LoginPage from "./components/LoginPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);
