import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import DashboardLayout from "./Layout/DashboardLayout";
import ReportandInsights from "./UserDashboardComponent/ReportandInsights";
import AddExpense from "./UserDashboardComponent/AddExpense";
import ExpenseHistory from "./UserDashboardComponent/ExpenseHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "member/reports",
        element: <ReportandInsights />,
      },
      {
        path: "member/addexpense",
        element: <AddExpense />,
      },
      {
        path: "member/history",
        element: <ExpenseHistory />,
      },
    ],
  },
]);
