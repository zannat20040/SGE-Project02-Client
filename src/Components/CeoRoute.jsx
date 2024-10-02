import React, { useContext } from "react";
import useUserInfo from "../Hooks & Context/useUserInfo";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Shared Component/Loading";

export default function CeoRoute({ children }) {
  const { userinfo, isLoading } = useUserInfo();
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading || isLoading) {
    return <Loading />;
  }
  if (user && userinfo?.role === "ceo") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
}
