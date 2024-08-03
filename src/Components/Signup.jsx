import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { GoEye, GoEyeClosed, GoUnlock } from "react-icons/go";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { IoPersonOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="card-body w-full lg:w-9/12 mx-auto text-center hidden md:flex flex-col justify-center ">
      {/* login top text */}
      <div>
        <div className="flex justify-center">
          <Link to={"/"}>
            <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-5xl rounded-full h-15 w-15 p-3 " />
          </Link>
        </div>
        <h1 className="text-3xl my-2 mb-3 font-medium text-primary-color ">
          Join Us!
        </h1>
        <p className="text-gray-500 mb-6">
          Create your account to effortlessly manage and track your office
          expenses..
        </p>
      </div>
      <form className="">
        {/* name */}
        <div className="grid grid-cols-2">
          <label className="p-2 py-3 rounded-none rounded-tl outline-none flex items-center gap-2 hover:bg-gray-100 border">
            <IoPersonOutline className="text-2xl  text-gray-300 " />
            <input
              type="text"
              className="grow text-sm  hover:bg-gray-100  outline-0"
              placeholder="John"
            />
          </label>
          <label className="p-2 py-3 rounded-tr rounded-none outline-none flex items-center gap-2 hover:bg-gray-100 border border-l-0">
            <IoPersonOutline className="text-2xl  text-gray-300 " />
            <input
              type="text"
              className="grow text-sm  hover:bg-gray-100  outline-0"
              placeholder="Doe"
            />
          </label>
        </div>
        {/* email */}
        <label className="p-2 py-3 rounded-none outline-none flex items-center gap-2 hover:bg-gray-100 border border-t-0">
          <GoMail className=" text-gray-300 " />
          <input
            type="email"
            className="grow text-sm  hover:bg-gray-100  outline-0"
            placeholder="example@gmail.com"
          />
        </label>
        {/* pass & confirm pass*/}
        <div className="grid grid-cols-2">
          <label className="relative p-2 py-3 rounded-none rounded-bl hover:bg-gray-100 flex items-center gap-2  border-t-0 border">
            <GoUnlock className=" text-gray-300" />
            <input
              type={passwordVisible ? "text" : "password"}
              className="grow text-sm hover:bg-gray-100  outline-0"
              placeholder="••••••••"
            />
            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3"
            >
              {passwordVisible ? (
                <GoEyeClosed className="text-gray-300" />
              ) : (
                <GoEye className="text-gray-300" />
              )}
            </button>
          </label>
          <label className="relative p-2 py-3 rounded-none rounded-br  hover:bg-gray-100 flex items-center gap-2  border-t-0 border-l-0 border">
            <GoUnlock className=" text-gray-300" />
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="grow text-sm hover:bg-gray-100 outline-0"
              placeholder="••••••••"
            />
            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 group"
            >
              {passwordVisible ? (
                <GoEyeClosed className="text-gray-300 " />
              ) : (
                <GoEye className="text-gray-300" />
              )}
            </button>
          </label>
        </div>
        {/* remember checkbox  */}
        <div className="form-control mt-4 ">
          <label className="label cursor-pointer justify-start items-start gap-3 text-start ">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm  rounded [--chkbg:theme(colors.primary-color)] [--chkfg:white] checked:border-0"
            />
            <span className="label-text text-sm">
              By signing up, I accept the Terms and Conditions and Privacy
              Policy.
            </span>
          </label>
        </div>

        {/* button */}
        <div className="flex mt-4 items-center gap-2">
          <Button className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none">
            Create New Account
          </Button>
          <Link to={"/"}>
            <ButtonOutlined label={"Login Now"} />
          </Link>
        </div>
      </form>
    </div>
  );
}
