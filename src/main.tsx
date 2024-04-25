import ReactDOM from "react-dom/client";

import App from "@/routes";
import { Toaster } from "sonner";

import { TokenProvider } from "./utils/contexts/token";

import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <App />
    <Toaster />
  </TokenProvider>
);
