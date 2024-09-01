import { createContext, useContext, useMemo, useState } from "react";
import useGetExpense from "./useGetExpense";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ExpenseContext = createContext();

export const useGetExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const { tableData, refetch, isLoading } = useGetExpense();

 // Filter out only the expenses with status "auto granted" or "granted"
 const filteredExpenses = tableData?.filter(expense =>
  ["auto granted", "granted"].includes(expense.status)
);

// Sum up the amounts of the filtered expenses
const totalAmount = filteredExpenses?.reduce((sum, expense) => {
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
