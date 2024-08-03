import React from "react";
import LoginLeftSide from "../Components/LoginLeftSide";
import Login from "../Components/Login";
import { AiOutlineGlobal } from "react-icons/ai";

export default function Root() {
  return (
    <div className="hero bg-white  min-h-screen">
      <div className=" flex-col  md:grid md:grid-cols-2 ">
        <div className="card-body w-9/12 mx-auto text-center ">
          {/* login top text */}
          <div>
            <div className="flex justify-center">
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-5xl rounded-full h-15 w-15 p-3 " />
            </div>
            <h1 className="text-3xl my-2 mb-3 font-medium ">Hello Again!</h1>
            <p className="text-gray-500 mb-6">
              It’s time to dive back into your journey. Enter your details to
              continue.
            </p>
          </div>
          {/* login form */}
          <Login />
        </div>

        <div className="text-center lg:text-left bg-primary-color h-screen p-10 flex flex-col justify-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <LoginLeftSide />
        </div>
      </div>
    </div>
  );
}
