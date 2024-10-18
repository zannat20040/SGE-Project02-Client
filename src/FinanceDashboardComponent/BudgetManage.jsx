import React, { useState } from "react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useUserInfo from "../Hooks & Context/useUserInfo";
import { Radio } from "@material-tailwind/react";
import BudgetRequest from "./BudgetRequest";
import AllocateBudget from "./AllocateBudget";

export default function BudgetManage() {
  const { userinfo } = useUserInfo();
  const [selectedRadio, setSelectedRadio] = useState("allocate");

  return (
    <div>
      {/* breadcrumbs add */}
      <BreadcrumsLayout
        route1={userinfo?.role}
        activeroute2={"budget-manage"}
      />

      <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-5 space-y-5 lg:space-y-0 mt-3">
        <div className="bg-white px-6 py-10 col-span-3">
          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-5 items-center">
            <p className="font-semibold text-xl text-primary-color md:text-start text-center ">
              {selectedRadio === "allocate"
                ? "Allocate the Budget"
                : "Request for the Budget Expension"}
            </p>
            <div className="flex gap-2 text-sm">
              <Radio
                name="type"
                label="Budget Allocation"
                checked={selectedRadio === "allocate"}
                onChange={() => setSelectedRadio("allocate")}
                color="amber"
              />
              <Radio
                name="type"
                label="Request for Budget"
                checked={selectedRadio === "request"}
                onChange={() => setSelectedRadio("request")}
                color="amber"
              />
            </div>
          </div>
          <div className="mt-20">
            {selectedRadio === "allocate" ? (
              <AllocateBudget />
            ) : (
              <BudgetRequest />
            )}
          </div>
        </div>
        <div className="bg-white px-6 py-10 col-span-2">statistics</div>
      </div>
    </div>
  );
}
