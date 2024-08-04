import { Avatar, Chip, Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function DashboardTopbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white  w-full h-fit p-4 flex justify-between items-center">
      {/* role */}
      <p className="font-medium text-sm text-primary-color ">Employee</p>
      {/* user avatar */}
      <div className="flex gap-3 items-center border-l pl-3 ">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
        />
        <div>
          <h1 className="font-medium text-sm text-primary-color ">
            {user?.displayName}
          </h1>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
