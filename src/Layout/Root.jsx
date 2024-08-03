import React from "react";
import LoginLeftSide from "../Components/LoginLeftSide";
import Login from "../Components/Login";
import { AiOutlineGlobal } from "react-icons/ai";

export default function Root() {
  return (
    <div className="hero bg-white  min-h-screen">
      <div className="grid md:grid-cols-2 grid-cols-1  justify-between w-full ">
        <div className="text-center min-h-screen">
          <LoginLeftSide />
        </div>

        <div className="card-body w-full lg:w-9/12 mx-auto text-center hidden md:flex flex-col justify-center ">
          {/* login form */}
          <Login />
        </div>
      </div>
    </div>
  );
}
