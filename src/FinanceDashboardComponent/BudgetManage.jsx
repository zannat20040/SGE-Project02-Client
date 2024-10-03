import React from "react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useUserInfo from "../Hooks & Context/useUserInfo";
import NavlistForBudget from "../Navlist/NavlistForBudget";
import { Outlet } from "react-router-dom";

export default function BudgetManage() {
  const { userinfo } = useUserInfo();

  return (
    <div>
      {/* breadcrumbs add */}
      <BreadcrumsLayout
        route1={userinfo?.role}
        activeroute2={"budget-manage"}
      />

      <div className="grid grid-cols-4 gap-3 mt-3">
        <div className="bg-white  ">
            <p className="p-5 font-semibold text-2xl text-gray-500 text-center">Budget Management </p>
          <NavlistForBudget />
        </div>
        <div className="bg-white px-6 py-10 col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
