import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { HashRouter } from "react-router-dom";
import App from "./App";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import { AppProvider } from "./context/AppContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <AppProvider>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </MotionConfig>
      </AppProvider>
    </HashRouter>
  </React.StrictMode>
);
