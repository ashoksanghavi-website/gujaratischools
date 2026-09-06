import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

/* Self-hosted fonts. @fontsource sets font-display: swap. */
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/inter/index.css";
import "@fontsource/noto-sans-gujarati/400.css";
import "@fontsource/noto-sans-gujarati/500.css";
import "@fontsource/noto-sans-gujarati/700.css";

import "./styles/global.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
