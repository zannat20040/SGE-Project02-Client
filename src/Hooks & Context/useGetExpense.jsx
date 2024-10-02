import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosBase from "./useAxiosBase";

export default function useGetExpense() {
  const { user } = useContext(AuthContext);
  const axiosBase = useAxiosBase();

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
      try {
        const response = await axiosBase.get(`/expense/${user?.email}`, {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        });
        const data = response.data.data || [];
        const reversedData = data?.slice().reverse();
        return reversedData;
      } catch (err) {
        return []; 
      }
    },
  });

  return { tableData, refetch, isLoading };
}
