import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import DashboardLayout from "./Layout/DashboardLayout";
import ReportandInsights1 from "./UserDashboardComponent/ReportandInsights";
import AddExpense1 from "./Shared Dashboard Component/AddExpense";
import ExpenseHistory from "./UserDashboardComponent/ExpenseHistory";
import AllExpenses from "./FinanceDashboardComponent/AllExpenses";
import AddNewFinance from "./CEODashboardComponent/AddNewFinance";
import MemberHistoryDownload from "./PrintHistory/MemberHistoryDownload";
import MembersExpense from "./Shared Dashboard Component/MembersExpense";
import AllHistoryForCeo from "./CEODashboardComponent/AllHistoryForCeo";
import AllFinance from "./CEODashboardComponent/AllFinance";

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
      // common route
      {
        path: "reports",
        element: <ReportandInsights1 />,
      },
      // employee routes
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
        path: "finance/allexpenses",
        element: <AllExpenses />,
      },
      {
        path: "finance/allHistory",
        element: <MembersExpense />,
      },
      // CEO route
      {
        path: "ceo/addexpense",
        element: <AddExpense1 />,
      },
      {
        path: "ceo/allHistory",
        element: <AllHistoryForCeo />,
      },
      {
        path: "ceo/addnewfinance",
        element: <AddNewFinance />,
      },
      {
        path: "ceo/allfinance",
        element: <AllFinance />,
      },
      {
        path: "ceo/membersExpense",
        element: <MembersExpense />,
      },
    ],
  },
  // {
  //   path: "download",
  //   element: <MemberHistoryDownload />,
  // },
]);
