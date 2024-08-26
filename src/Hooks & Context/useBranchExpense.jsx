import React, { useContext } from "react";
import useAxiosBase from "./useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export default function useBranchExpense(branch) {
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const {
    data: response,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["branchExpenses", branch],
    queryFn: async () => {
      try {
        const response = await axiosBase.post(
          `/expense/branch`,
          { branch },
          {
            headers: {
              Authorization: `Bearer ${user?.email}`,
            },
          }
        );
        return response.data || [];
      } catch (error) {
        throw error;
      }
    },
  });

  // Extract the data from the response
  const branchExpenses = response?.data.slice().reverse() || [];

  return { branchExpenses, refetch, isLoading, error };
}
