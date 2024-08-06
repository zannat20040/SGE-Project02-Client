import React from "react";
import { NavLink } from "react-router-dom";

export default function NavlistForCEO() {
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
        to="/dashboard/ceo/reports"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Reports & Insights
      </NavLink>
      <NavLink
        to="/dashboard/ceo/addexpenses"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Add Expense
      </NavLink>{" "}
      <NavLink
        to="/dashboard/ceo/addnewfinance"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Add New Finance
      </NavLink>
      <NavLink
        to="/dashboard/ceo/allHistory"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        All Expense History
      </NavLink>
    </div>
  );
}
