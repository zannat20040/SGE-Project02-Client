import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosBase from './useAxiosBase';

export default function useGetExpense() {
    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();

    const { data: tableData, refetch, isLoading } = useQuery({
        queryKey: ["expenses", user?.email],
        queryFn: async () => {
          const response = await axios.get(`/expense/${user?.email}`, {
            headers: {
              Authorization: `Bearer ${user?.email}`,
            },
          });
          return response.data.data;
        },
      });
    
      return { tableData, refetch, isLoading };
}
