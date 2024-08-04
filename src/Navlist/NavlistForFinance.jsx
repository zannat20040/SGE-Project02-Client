import React from "react";

export default function NavlistForFinance() {
  return (
    <div>
      <NavLink
        to="/dashboard/finance/reports"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Reports & Insights
      </NavLink>
      <NavLink
        to="/dashboard/finance/allexpenses"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Add Expense
      </NavLink>
      <NavLink
        to="/dashboard/finance/allHistory"
        className="rounded-l-full w-full block py-3 px-3 font-medium duration-300"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Expense History
      </NavLink>
    </div>
  );
}
