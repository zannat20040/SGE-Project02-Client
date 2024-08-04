import { Avatar, Badge, Chip } from "@material-tailwind/react";
import React from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavlistForUser from "../Navlist/NavlistForUser";
import ButtonOutlined from "../Shared Component/ButtonOutlined";

export default function DashboardSidebar() {
  return (
    <div className="drawer lg:drawer-open w-fit ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side sticky left-0 top-0 ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}
        <ul className="menu bg-white text-base-content min-h-full w-60 shadow-xl p-0 flex flex-col justify-between">
          <div>
            {/* logo */}
            <div className="flex justify-center gap-2 items-center  p-4">
              <Link to={"/"}>
                <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-2xl rounded-full h-8 w-8" />
              </Link>
              <h1 className="font-bold  tracking-widest uppercase text-primary-color">
                Shabuj Global
              </h1>
            </div>

            {/* nav menu */}
            <div className="pl-5 mt-14 ">
              <NavlistForUser />
            </div>
          </div>

          {/* logout btn */}
          <div className="p-4">
            <ButtonOutlined label={"Logout"} />
          </div>
        </ul>
      </div>
    </div>
  );
}
