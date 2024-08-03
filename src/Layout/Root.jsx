import React from "react";
import LoginLeftSide from "../Components/LoginLeftSide";
import Login from "../Components/Login";
import { AiOutlineGlobal } from "react-icons/ai";

export default function Root() {
  return (
    <div className="hero bg-white  min-h-screen">
      <div className=" flex-col  md:grid md:grid-cols-2 justify-between w-full ">
        <div className="text-center h-screen">
          <LoginLeftSide />
        </div>

        <div className="card-body w-9/12 mx-auto text-center flex flex-col justify-center ">
          {/* login top text */}
          <div>
            <div className="flex justify-center">
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-5xl rounded-full h-15 w-15 p-3 " />
            </div>
            <h1 className="text-3xl my-2 mb-3 font-medium text-primary-color ">
              Hello Again!
            </h1>
            <p className="text-gray-500 mb-6">
              It’s time to dive back into your journey. Enter your details to
              continue.
            </p>
          </div>
          {/* login form */}
          <Login />
        </div>
      </div>
    </div>
  );
}
