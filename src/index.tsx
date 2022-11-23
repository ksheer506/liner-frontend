import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "assets";
import { BrowserRouter } from "react-router-dom";

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
