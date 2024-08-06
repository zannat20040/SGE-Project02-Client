import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosBase from "./useAxiosBase";
import { useLocation } from "react-router-dom";

export default function useGetExpense() {
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const {
    data: tableData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["expenses", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const response = await axiosBase.get(`/expense/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      const data = response.data.data || [];
      const reversedData = data?.slice().reverse();
      return reversedData;
    },
  });

  return { tableData, refetch, isLoading };
}
