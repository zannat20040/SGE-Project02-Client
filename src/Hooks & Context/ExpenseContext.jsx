import { createContext, useMemo } from "react";
import useGetExpense from "./useGetExpense";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { tableData, refetch, isLoading } = useGetExpense();

  const totalAmount = useMemo(() => {
    if (!tableData) return 0;
    return tableData.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  }, [tableData]);

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
