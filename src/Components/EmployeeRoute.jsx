import React, { useContext } from "react";
import useUserInfo from "../Hooks & Context/useUserInfo";
import Loading from "../Shared Component/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function EmployeeRoute({ children }) {
  const { userinfo, isLoading } = useUserInfo();
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();

  console.log(userinfo)

  if (loading || isLoading) {
    return <Loading />;
  }
  if (user && userinfo?.role === "employee") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
}
