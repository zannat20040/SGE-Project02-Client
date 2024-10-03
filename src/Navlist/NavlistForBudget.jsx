import React from "react";
import { NavLink } from "react-router-dom";

export default function NavlistForBudget() {
  const activeStyle = {
    borderLeft: "4px solid #7B7C00",
    padding: "12px 24px",
    color: "#7B7C00",
  };

  const inactiveStyle = {
    color: "gray",
  };

  return (
    <div className="py-8">
      <NavLink
        to="/dashboard/finance/budget/allocate"
        className="  w-full block py-3 px-5 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Allocate Budget
      </NavLink>
      <NavLink
        to="/dashboard/finance/budget/request"
        className=" w-full block py-3 px-5 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Request for Budget
      </NavLink>
    </div>
  );
}
