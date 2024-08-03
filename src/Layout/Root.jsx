import React from "react";
import LoginLeftSide from "../Components/LoginLeftSide";
import Login from "../Components/Login";
import { AiOutlineGlobal } from "react-icons/ai";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="hero bg-white  min-h-screen">
      <div className="grid md:grid-cols-2 grid-cols-1  justify-between w-full ">
        <div className="text-center min-h-screen">
          <LoginLeftSide />
        </div>

        <Outlet />
        <div></div>
      </div>
    </div>
  );
}
