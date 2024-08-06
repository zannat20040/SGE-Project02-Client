import { createContext, useContext, useMemo } from "react";
import useGetExpense from "./useGetExpense";

const ExpenseContext = createContext();

export const useGetExpenseContext = () => {
    return useContext(ExpenseContext);
  };

export const ExpenseProvider = ({ children }) => {
  const { tableData, refetch, isLoading } = useGetExpense();

  console.log(tableData)
  
  const totalAmount = tableData?.reduce((sum, expense) => {
    const amount = parseFloat(expense.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);


  console.log(totalAmount)

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
