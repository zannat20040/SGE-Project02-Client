import React, { useState } from "react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useUserInfo from "../Hooks & Context/useUserInfo";
import { Radio } from "@material-tailwind/react";

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

      <div className="bg-white px-6 py-10 mt-3">
        <div className="flex  justify-between gap-4 items-center">
          <p className="p-5 font-semibold text-xl text-gray-500 ">
           {selectedRadio=== 'allocate' ? 'Allocate the Budget' : 'Request for the Budget Expension'} 
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
      </div>
    </div>
  );
}
