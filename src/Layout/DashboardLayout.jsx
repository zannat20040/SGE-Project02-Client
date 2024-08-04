import React from "react";
import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardTopbar from "../Components/DashboardTopbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="bg-base-200 flex ">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <DashboardTopbar />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
