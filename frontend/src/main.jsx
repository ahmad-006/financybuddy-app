import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { supabaseAnonKey, supabaseUrl } from "./supabase-client/supabase-client.js"; // Removed

// console.log(supabaseUrl, supabaseAnonKey); // Removed
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
