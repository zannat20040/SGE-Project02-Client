import React from "react";
import { NavLink } from "react-router-dom";

export default function NavlistForUser() {
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
        to="/dashboard/member/reports"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Reports & Insights
      </NavLink>
      <NavLink
        to="/dashboard/member/addexpense"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Add Expense
      </NavLink>
      <NavLink
        to="/dashboard/member/history"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Expense History
      </NavLink>
    </div>
  );
}
