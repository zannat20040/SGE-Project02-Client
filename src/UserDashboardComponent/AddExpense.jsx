import React from "react";
import Breadcrumbs from "../Shared Component/Breadcrumbs";

export default function AddExpense() {
  return (
    <div>
      {/* breadcrumbs add */}
      <Breadcrumbs
        routeLabel={"Add Expense"}
        routePath={"dashbaord / employee / addexpense"}
      />
    </div>
  );
}
