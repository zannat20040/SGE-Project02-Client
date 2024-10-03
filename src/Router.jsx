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
import MembersExpense from "./Shared Dashboard Component/MembersExpense";
import AllHistoryForCeo from "./CEODashboardComponent/AllHistoryForCeo";
import AllFinance from "./CEODashboardComponent/AllFinance";
import PrivateRoute from "./Components/PrivateRoute";
import EmployeeRoute from "./Components/EmployeeRoute";
import FinanceRoute from "./Components/FinanceRoute";
import CeoRoute from "./Components/CeoRoute";
import BudgetManage from "./FinanceDashboardComponent/BudgetManage";
import BudgetRequest from "./FinanceDashboardComponent/BudgetRequest";
import AllocateBudget from "./FinanceDashboardComponent/AllocateBudget";

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
            <EmployeeRoute>
              <AddExpense1 />,
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "employee/history",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <ExpenseHistory />,
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      // finance route
      {
        path: "finance/allexpenses",
        element: (
          <PrivateRoute>
            <FinanceRoute>
              <AllExpenses />,
            </FinanceRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "finance/allHistory",
        element: (
          <PrivateRoute>
            <FinanceRoute>
              <MembersExpense />,
            </FinanceRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "finance/budget",
        element: (
          <PrivateRoute>
            <FinanceRoute>
              <BudgetManage />
            </FinanceRoute>
          </PrivateRoute>
        ),
        // children: [
        //   {
        //     path: "allocate",
        //     element: (
        //       <PrivateRoute>
        //         <FinanceRoute>
        //           <AllocateBudget />
        //         </FinanceRoute>
        //       </PrivateRoute>
        //     ),
        //   },
        //   {
        //     path: "request",
        //     element: (
        //       <PrivateRoute>
        //         <FinanceRoute>
        //           <BudgetRequest />
        //         </FinanceRoute>
        //       </PrivateRoute>
        //     ),
        //   },
        // ],
      },
      // CEO route
      {
        path: "ceo/addexpense",
        element: (
          <PrivateRoute>
            <CeoRoute>
              <AddExpense1 />,
            </CeoRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/allHistory",
        element: (
          <PrivateRoute>
            <CeoRoute>
              <AllHistoryForCeo />,
            </CeoRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/addnewfinance",
        element: (
          <PrivateRoute>
            <CeoRoute>
              <AddNewFinance />,
            </CeoRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/allfinance",
        element: (
          <PrivateRoute>
            <CeoRoute>
              <AllFinance />,
            </CeoRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "ceo/memberExpense",
        element: (
          <PrivateRoute>
            <CeoRoute>
              <MembersExpense />,
            </CeoRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
