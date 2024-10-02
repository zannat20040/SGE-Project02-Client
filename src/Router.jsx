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
import PrivateRoute from "./Hooks & Context/PrivateRoute";

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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // common route
      {
        path: "reports",
        element: (
          <PrivateRoute>
            <ReportandInsights1 />
          </PrivateRoute>
        ),
      },
      // employee routes
      {
        path: "employee/addexpense",
        element: (
          <PrivateRoute>
            <AddExpense1 />,
          </PrivateRoute>
        ),
      },
      {
        path: "employee/history",
        element: (
          <PrivateRoute>
            <ExpenseHistory />,
          </PrivateRoute>
        ),
      },
      // finance route
      {
        path: "finance/allexpenses",
        element: (
          <PrivateRoute>
            <AllExpenses />,
          </PrivateRoute>
        ),
      },
      {
        path: "finance/allHistory",
        element: (
          <PrivateRoute>
            <MembersExpense />,
          </PrivateRoute>
        ),
      },
      // CEO route
      {
        path: "ceo/addexpense",
        element: (
          <PrivateRoute>
            <AddExpense1 />,
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/allHistory",
        element: (
          <PrivateRoute>
            <AllHistoryForCeo />,
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/addnewfinance",
        element: (
          <PrivateRoute>
            <AddNewFinance />,
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/allfinance",
        element: (
          <PrivateRoute>
            <AllFinance />,
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/membersExpense",
        element: (
          <PrivateRoute>
            <MembersExpense />,
          </PrivateRoute>
        ),
      },
    ],
  },
]);
