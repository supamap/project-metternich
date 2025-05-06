import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { HistoryDataProvider } from "./context/HistoryDataContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HistoryDataProvider>
        <App />
      </HistoryDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);