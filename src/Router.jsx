import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import DashboardLayout from "./Layout/DashboardLayout";
import ReportandInsights1 from "./UserDashboardComponent/ReportandInsights";
import AddExpense1 from "./Shared Dashboard Component/AddExpense";
import ExpenseHistory from "./UserDashboardComponent/ExpenseHistory";
import Reportandinsights2 from "./FinanceDashboardComponent/Reportandinsights";
import AllExpenses from "./FinanceDashboardComponent/AllExpenses";
import IndividualExpensesHistory from "./FinanceDashboardComponent/IndividualExpensesHistory";
import Reportandinsights3 from "./CEODashboardComponent/ReportandInsights";
import AddNewFinance from "./CEODashboardComponent/AddNewFinance";
import MemberHistoryDownload from "./UserDashboardComponent/MemberHistoryDownload";

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
      // employee routes
      {
        path: "employee/reports",
        element: <ReportandInsights1 />,
      },
      {
        path: "employee/addexpense",
        element: <AddExpense1 />,
      },
      {
        path: "employee/history",
        element: <ExpenseHistory />,
      },
      // finance route
      {
        path: "finance/reports",
        element: <Reportandinsights2 />,
      },
      {
        path: "finance/allexpenses",
        element: <AllExpenses />,
      },
      {
        path: "finance/allHistory",
        element: <IndividualExpensesHistory />,
      },
      // CEO route
      {
        path: "ceo/reports",
        element: <Reportandinsights3 />,
      },
      {
        path: "ceo/addexpenses",
        element: <AddExpense1 />,
      },
      {
        path: "ceo/allHistory",
        element: <IndividualExpensesHistory />,
      },
      {
        path: "ceo/addnewfinance",
        element: <AddNewFinance />,
      },
    ],
  },
  {
    path: "download",
    element: <MemberHistoryDownload />,
  },
]);
