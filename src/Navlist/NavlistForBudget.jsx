import React from "react";
import { NavLink } from "react-router-dom";

export default function NavlistForBudget() {
  const activeStyle = {
    backgroundColor: "#7B7C00",
    padding: "12px 24px",
    color: "white",
  };

  const inactiveStyle = {
    color: "#7B7C00",
  };

  return (
    <div>
      <NavLink
        to="/dashboard/finance/budget/allocate"
        className="rounded-r-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Allocate Budget
      </NavLink>
      <NavLink
        to="/dashboard/finance/budget/request"
        className="rounded-r-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Request for Budget
      </NavLink>
    </div>
  );
}
