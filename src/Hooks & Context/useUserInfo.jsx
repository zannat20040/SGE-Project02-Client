import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosBase from "./useAxiosBase";
import { useQuery } from "@tanstack/react-query";

export default function useUserInfo(email) {
  const axiosBase = useAxiosBase();

  const {
    data: userinfo,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo", email],
    queryFn: async () => {
      const response = await axiosBase.get(`/getRole/${email}`);
      return response.data;
    },
  });

  return { userinfo, refetch, isLoading, error };
}
