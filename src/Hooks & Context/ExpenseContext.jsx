import { createContext, useContext, useMemo, useState } from "react";
import useGetExpense from "./useGetExpense";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUserInfo from "./useUserInfo";
import useAxiosBase from "./useAxiosBase";
import { useQuery } from "@tanstack/react-query";

const ExpenseContext = createContext();

export const useGetExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const {
    data: employeeDetail,
    isLoading:loadBudget,
    refetch:refetchBudget,
  } = useQuery({
    queryKey: ["employeeDetail", user?.email],
    queryFn: async () => {
      const response = await axiosBase.get(
        `/employee/getUsers?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );

      const data = response?.data?.users[0];
      return data;
    },
  });

  console.log(employeeDetail);

  const { tableData, refetch, isLoading } = useGetExpense();

  //  Filter out only the expenses with status "auto granted" or "granted"
  const filteredExpenses = tableData?.filter((expense) =>
    ["auto granted", "granted"].includes(expense.status)
  );

  // Sum up the amounts of the filtered expenses
  const totalAmount = filteredExpenses?.reduce((sum, expense) => {
    const amount = parseFloat(expense.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  let remainingBalance = employeeDetail?.budget?.remainingBudget;

  const contextValue = {
    tableData,
    refetch,
    isLoading,
    totalAmount,
    remainingBalance,
    refetchBudget,
    loadBudget
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};
