import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

window.addEventListener("unhandledrejection", (event) => {
  const msg = event.reason?.message || String(event.reason || "");
  if (
    msg.includes("MetaMask") ||
    msg.includes("ethereum") ||
    msg.includes("chrome-extension://") ||
    msg.includes("moz-extension://")
  ) {
    event.preventDefault();
  }
});

window.addEventListener("error", (event) => {
  const src = event.filename || "";
  const msg = event.message || "";
  if (
    src.includes("chrome-extension://") ||
    src.includes("moz-extension://") ||
    msg.includes("MetaMask") ||
    msg.includes("ethereum")
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
