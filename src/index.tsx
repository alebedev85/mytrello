import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./store/index.ts";

import "./index.css";

const Router =
  import.meta.env.MODE === "development" ? BrowserRouter : HashRouter;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
