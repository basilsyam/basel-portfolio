import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import { AppProvider } from "./context/AppContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
