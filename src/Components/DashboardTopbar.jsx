import { Avatar, Badge } from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { CiDollar } from "react-icons/ci";
import { useGetExpenseContext } from "../Hooks & Context/ExpenseContext";
import useUserInfo from "../Hooks & Context/useUserInfo";

export default function DashboardTopbar() {
  const { user } = useContext(AuthContext);
  const { totalAmount } = useGetExpenseContext(user?.email);
  const { userinfo } = useUserInfo();

  return (
    <div className="bg-white  w-full h-fit p-4 flex flex-wrap gap-1 justify-between   items-center sticky top-0 left-0 z-10 ">
      {/* role & branch */}
      <div>
        <p className="font-medium text-sm text-primary-color capitalize">
          {userinfo?.role}
        </p>
        <p className="text-xs text-gray-400 capitalize">{userinfo?.branch}</p>
      </div>

      <div className="flex  sm:gap-6 gap-3  sm:justify-between justify-center  items-center flex-nowrap">
        {/* total expense */}
        {userinfo?.role !== "finance" && (
          <div className="flex gap-3 items-center">
            <p className="text-primary-color font-medium text-sm sm:flex hidden">
              Total Expense:
            </p>

            <Badge
              content={
                <CiDollar
                  className="h-4 w-4 text-white text-2xl p-0"
                  strokeWidth={1.5}
                />
              }
              className=" bg-yellow-800 "
            >
              <button className="bg-yellow-800 p-2 rounded text-white font-medium text-xs">
                ${parseFloat(totalAmount).toFixed(2)}
              </button>
            </Badge>
          </div>
        )}

        {/* user avatar */}
        <div
          className={`flex gap-3 items-center ${
            userinfo?.role !== "finance" && "sm:border-l"
          } pl-3 `}
        >
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            className="hidden sm:flex"
          />
          <div>
            <h1 className="font-medium text-sm text-primary-color capitalize">
              {user?.displayName}
            </h1>
            <p className="text-xs text-gray-400"> {user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
