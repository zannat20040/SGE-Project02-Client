import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosBase from "./useAxiosBase";
import { useQuery } from "@tanstack/react-query";

export default function useUserInfo() {
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const {
    data: userinfo,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return null; // Return null or an empty object if email is undefined
      }
      const response = await axiosBase.get(`/getRole/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      return response.data;
    },
  });

  return { userinfo, refetch, isLoading, error };
}
