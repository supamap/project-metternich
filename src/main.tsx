import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { HistoryDataProvider } from "./context/HistoryDataContext.js";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // 👈 your centralized theme config

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <HistoryDataProvider>
          <App />
        </HistoryDataProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
