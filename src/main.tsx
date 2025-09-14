import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// src/main.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "modern-normalize";
import App from "./components/App/App";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
