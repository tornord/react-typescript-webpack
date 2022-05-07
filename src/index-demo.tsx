import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Badge from "./Badge";
import "./index.scss";

var rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

exports = {
  React,
  ReactDOM,
  Badge,
};
Object.keys(exports).forEach((d: any) => (window[d] = exports[d]));
