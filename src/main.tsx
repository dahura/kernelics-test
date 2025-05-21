import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { EmployeeDashboard } from "./app/Employees.tsx";
import { QueryClientProvider } from "./providers/QueryClientProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <EmployeeDashboard />
    </QueryClientProvider>
  </StrictMode>
);
