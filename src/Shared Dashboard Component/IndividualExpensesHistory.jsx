import React, { useState } from "react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { HiArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { TfiDownload } from "react-icons/tfi";
import PrimaryButton from "../Shared Component/PrimaryButton";
import PaginationLayout from "../Shared Component/PaginationLayout";

export default function IndividualExpensesHistory() {
  // tabledata
  const tableData = [
    {
      id: 1,
      memberName: "Member Name",
      memberEmail: "memberemail@gmail.com",
      amount: "$500.00",
      role: "Employee",
    },
    {
      id: 2,
      memberName: "Member Name",
      memberEmail: "ceo@gmail.com",
      amount: "$500.00",
      role: "CEO",
    },
    {
      id: 3,
      memberName: "Member Name",
      memberEmail: "memberemail@gmail.com",
      amount: "$500.00",
      role: "Employee",
    },
  ];

  // pagination start from here
  const [active, setActive] = useState(1);

  const itemsPerPage = 2; // Show one item per page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate paginated data
  const paginatedData = tableData.slice(
    (active - 1) * itemsPerPage,
    active * itemsPerPage
  );

  // pagination function
  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div>
      <div>
        {/* breadcrumbs add */}

        {/* table */}
        <div className="bg-white px-6 py-10 mt-6 ">
          {/* table data */}

          <div className="overflow-x-auto">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color  ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Total Expenses</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Expenses Statement</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((data) => (
                  <tr className="hover">
                    <td>{data?.id}</td>
                    <td>{data?.memberName}</td>
                    <td>{data?.memberEmail}</td>
                    <td>{data?.amount}</td>
                    <td>{data?.role}</td>
                    <td className="flex gap-2 justify-center">
                      <PrimaryButton label={<TfiDownload />} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-9">
            <PrimaryButton label={"Print All History"} />

            {/* pagination */}
            <div className="flex items-center mt-10 justify-end">
              <PaginationLayout
                prev={prev}
                next={next}
                active={active}
                setActive={setActive}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
