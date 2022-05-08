import React from "react";
import ReactDOM from "react-dom/client";
import { Badge } from "./Badge";
import "./fonts.css";
import "./index.css";

var rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <h1>My react component</h1>
      <Badge value="ABC" />
    </React.StrictMode>
  );
}

const exports = {
  React,
  ReactDOM,
  Badge,
};
Object.keys(exports).forEach((d: any) => (window[d] = (exports as any)[d]));
