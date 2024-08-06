import { createContext, useContext, useMemo } from "react";
import useGetExpense from "./useGetExpense";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useLocation } from "react-router-dom";
import useUserInfo from "./useUserInfo";

const ExpenseContext = createContext();

export const useGetExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const { tableData, refetch, isLoading } = useGetExpense();
  const { user } = useContext(AuthContext);
  // const location = useLocation();
  // const isCeoPath = location.pathname.includes("ceo");
  // const userEmail = isCeoPath ? "ceo@gmail.com" : user?.email;
  // const { userinfo } = useUserInfo(userEmail);

  const totalAmount = tableData?.reduce((sum, expense) => {
    const amount = parseFloat(expense.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const contextValue = {
    tableData,
    refetch,
    isLoading,
    totalAmount,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};
