import { Avatar, Badge, Button, Chip, Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { CiDollar } from "react-icons/ci";

export default function DashboardTopbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white  w-full h-fit p-4 flex justify-between items-center">
      {/* role & branch */}
      <div>
        <p className="font-medium text-sm text-primary-color ">Employee</p>
        <p className="text-xs text-gray-400">Branch name</p>
      </div>

     <div className="flex gap-6 justify-between  items-center">
       {/* total expense */}
       <div>
        <Badge
          content={
            <CiDollar  className="h-4 w-4 text-yellow-700 text-2xl p-0" strokeWidth={1.5}  />
          }
          className=" bg-white "
        >
          <button className="bg-primary-color p-2 rounded text-white font-medium text-xs">100</button>
        </Badge>
      </div>
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
    </div>
  );
}
