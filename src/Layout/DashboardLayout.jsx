import React from "react";
import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardTopbar from "../Components/DashboardTopbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="bg-base-200 flex w-full ">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <DashboardTopbar />
        <div className="p-5 min-h-screen h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
