import React from "react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { GoUnlock } from "react-icons/go";
import { Button } from "@material-tailwind/react";

export default function Login() {
  return (
    <form className="">
      {/* email */}
      <label className="p-2 py-3 rounded rounded-b-none outline-none flex items-center gap-2 hover:bg-gray-100 border">
        <MdOutlineMarkEmailUnread className="text-2xl  text-gray-300 " />
        <input
          type="email"
          className="grow text-sm  hover:bg-gray-100  outline-0"
          placeholder="example@gmail.com"
        />
      </label>
      {/* pass */}
      <label className="p-2 py-3 rounded-t-none rounded hover:bg-gray-100 flex items-center gap-2  border-t-0 border">
        <GoUnlock className="text-2xl  text-gray-300" />
        <input
          type="password"
          className="grow text-sm hover:bg-gray-100  outline-0"
          placeholder="••••••••"
        />
      </label>
      {/* remember checkbox & forget pass */}
      <div className="mt-4 flex gap-3 justify-between items-center">
        <div className="form-control">
          <label className="label cursor-pointer justify-start items-center gap-3 ">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm  rounded [--chkbg:theme(colors.primary-color)] [--chkfg:white] checked:border-0"
            />
            <span className="label-text text-sm">Remember me</span>
          </label>
        </div>
        <p className="text-sm text-primary-color font-medium text-end">
          Forget password?
        </p>
      </div>

      {/* button */}
      <div className="flex mt-3 items-center gap-2">
        <Button className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none">
          Login Now
        </Button>
        <Button className="bg-white  border  duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none">
          Create New Account
        </Button>
      </div>
    </form>
  );
}
