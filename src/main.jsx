import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { HistoryProvider } from "./context/HistoryContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <HistoryProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </HistoryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
