import React, { useContext } from "react";
import useAxiosBase from "./useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export default function useBranchExpense(branch) {
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const {
    data: branchExpenses,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["branchExpenses", branch],
    queryFn: async () => {
      const response = await axiosBase.post(
        `/expense/branch`,
        { branch },
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      const data = response.data.data || [];
      const reversedData = data?.slice().reverse();
      return reversedData;
    },
  });

  console.log(branchExpenses)

  return { branchExpenses, refetch, isLoading, error };
}
