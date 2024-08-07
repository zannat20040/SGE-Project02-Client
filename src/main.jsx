import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import AuthProvider from "./AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExpenseProvider } from "./Hooks & Context/ExpenseContext";



const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ExpenseProvider>
          <RouterProvider router={router} />
        </ExpenseProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
