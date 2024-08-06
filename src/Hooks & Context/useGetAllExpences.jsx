import React from 'react'
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosBase from './useAxiosBase';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllExpences(active) {
    const axiosBase = useAxiosBase();
  
    const {
      data: tableData,
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["expenses", 'ceo@gmail.com'],
      queryFn: async () => {
        if (!user?.email) {
          return [];
        }
        const response = await axiosBase.get(`/expense/?page${active}&number=${5}`, {
          headers: {
            Authorization: `Bearer 'ceo@gmail.com'`,
          },
        });
        const data = response.data.data || [];
        const reversedData = data?.slice().reverse();
        return reversedData;
      },
    });
  
    return { tableData, refetch, isLoading };
}
