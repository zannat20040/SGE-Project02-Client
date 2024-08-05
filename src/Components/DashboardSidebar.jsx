import { Avatar, Badge, Button, Chip } from "@material-tailwind/react";
import React from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavlistForUser from "../Navlist/NavlistForUser";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { FaBars } from "react-icons/fa";

export default function DashboardSidebar() {
  return (
    <div className="drawer lg:drawer-open w-fit relative ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start fixed bottom-4 left-4">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="bg-primary-color text-white p-3 rounded-full drawer-button lg:hidden"
        >
          <FaBars  />
        </label>
      </div>
      <div className="drawer-side fixed left-0 top-0 z-40">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}
        <ul className="menu bg-white text-base-content min-h-full w-60 shadow-xl p-0 flex flex-col justify-between">
          <div>
            {/* logo */}
            <Link
              to={"/"}
              className="flex justify-center gap-2 items-center  p-4"
            >
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-2xl rounded-full h-8 w-8" />
              <h1 className="font-bold  tracking-widest uppercase text-primary-color">
                Shabuj Global
              </h1>
            </Link>

            {/* nav menu */}
            <div className="pl-5 mt-14 ">
              <NavlistForUser />
            </div>
          </div>

          {/* logout btn */}
          <div className="p-4 flex flex-col gap-1">
            <Button
              type="submit"
              className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-full  "
            >
              Download All History
            </Button>
            <ButtonOutlined label={"Logout"} />
          </div>
        </ul>
      </div>
    </div>
  );
}
