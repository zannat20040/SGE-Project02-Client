import React, { useState } from "react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { HiArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { CiStickyNote } from "react-icons/ci";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import { CiCalendarDate } from "react-icons/ci";
import { Chip } from "@material-tailwind/react";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import PaginationLayout from "../Shared Component/PaginationLayout";
import PrimaryButton from "../Shared Component/PrimaryButton";

export default function AllExpenses() {
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  // object
  const tableData = [
    {
      id: 1,
      memberName: "Member Name",
      memberEmail: "memberemail@gmail.com",
      purpose: "Expense Purpose",
      amount: "$500.00",
      category: "Category",
      status: "Pending",
      role: "Employee",
      date: "12/16/2020",
      note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, facilis! Aliquid eos, libero possimus tempore temporibus sapiente? Sint esse omnis eum aliquam maxime vitae nihil consectetur veritatis itaque, corporis adipisci, atque accusantium voluptatibus nobis unde mollitia libero facere. Dolores molestias magnam omnis voluptas molestiae aperiam incidunt reprehenderit ipsum obcaecati corrupti.",
      receipt: null,
    },
    {
      id: 2,
      memberName: "Cy Ganderton",
      memberEmail: "memberemail@gmail.com",
      purpose: "Expense Purpose",
      amount: "$500.00",
      category: "Category",
      status: "Decline",
      role: "CEO",
      date: "12/16/2020",
      note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, facilis! Aliquid eos, libero possimus tempore temporibus sapiente? Sint esse omnis eum aliquam maxime vitae nihil consectetur veritatis itaque, corporis adipisci, atque accusantium voluptatibus nobis unde mollitia libero facere. Dolores molestias magnam omnis voluptas molestiae aperiam incidunt reprehenderit ipsum obcaecati corrupti.",
      receipt: "null",
    },
    {
      id: 3,
      memberName: "Cy Ganderton",
      memberEmail: "memberemail@gmail.com",
      purpose: "Expense Purpose",
      amount: "$500.00",
      category: "Category",
      status: "Added",
      role: "Employee",
      date: "12/16/2020",
      note: "",
      receipt: "recipet",
    },
  ];

  // pagination start from here
  const [active, setActive] = useState(1);

  // date filter
  const filteredData = tableData.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    return (
      (!startDate || itemDate >= fromDate) && (!endDate || itemDate <= toDate)
    );
  });

  const itemsPerPage = 2; // Show one item per page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate paginated data
  const paginatedData = filteredData.slice(
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

  // status form
  const HandleReciptStatus = (e) => {
    e.preventDefault();
    const expenseStatus = e.target.status.value;
    console.log(expenseStatus);
  };

  return (
    <div>
      <div>
        {/* breadcrumbs add */}
        <BreadcrumsLayout route1={"finance"} activeroute2={"allexpenses"} />

        <div className="bg-white px-6 py-10 mt-6 ">
          {/* filter by date */}
          <form className="grid grid-cols-2 lg:w-1/3 sm:w-2/3  mb-6">
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiCalendarDate className="text-gray-400" />
              </div>
              <input
                required
                name="date"
                id="default-datepicker"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="hover:bg-gray-100  rounded-none outline-0 border-gray-200  text-sm block w-full ps-10 p-2.5 text-gray-400  border"
                placeholder="From"
              />
            </div>
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiCalendarDate className="text-gray-400" />
              </div>
              <input
                onChange={(e) => setEndDate(e.target.value)}
                required
                name="date"
                id="default-datepicker"
                type="date"
                className="hover:bg-gray-100  rounded-none outline-0 border-gray-200  text-sm block w-full ps-10 p-2.5 text-gray-400  border border-l-0"
                placeholder="To"
              />
            </div>
          </form>
          {/* table data */}
          <div className="overflow-x-auto">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color  ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4 text-start">Details</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Catagory</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Recipt/Note</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((data) => (
                  <tr className="hover">
                    <td>{data?.id}</td>
                    <td className="text-start">
                      <p>{data?.memberName}</p>
                      <p className="text-xs text-gray-500">
                        {data?.memberEmail}
                      </p>
                    </td>
                    <td>{data?.purpose}</td>
                    <td>{data?.amount}</td>
                    <td>{data?.category}</td>
                    {/* status change form */}
                    <td>
                      {data?.status === "Pending" ? (
                        <form
                          className=" border rounded flex "
                          onSubmit={HandleReciptStatus}
                        >
                          <select
                            required
                            name="status"
                            id="status"
                            defaultValue={""}
                            className="hover:bg-gray-100  rounded-none outline-0 border-gray-200  block w p-2 text-gray-400  text-xs "
                          >
                            <option value="" disabled hidden>
                              Pending
                            </option>
                            <option
                              className="text-black text-xs "
                              value={"Added"}
                            >
                              Added
                            </option>
                            <option
                              className="text-black text-xs "
                              value={"Declined"}
                            >
                              Declined
                            </option>
                          </select>
                          <button
                            type="submit"
                            class="text-white  top-0 bottom-0 my-auto bg-primary-color p-2 rounded  outline-none focus:border-0 focus:!outline-none h-fit"
                          >
                            <FaCheck className="text-xs" />
                          </button>
                        </form>
                      ) : (
                        <Chip
                          variant="ghost"
                          color={data.status === "Added" ? "green" : "red"}
                          size="sm"
                          value={data?.status}
                          className={`font-bold text-xs  rounded  !capitalize ${
                            data.status === "Added"
                              ? "text-green-600"
                              : "text-red-600"
                          } `}
                        />
                      )}
                    </td>
                    <td>{data?.role}</td>
                    <td>{data?.date}</td>
                    <td className="flex gap-2 justify-center">
                      {data?.note !== "" && (
                        <div>
                          <ButtonOutlined
                            label={<CiStickyNote />}
                            style={"w-fit"}
                          />
                        </div>
                      )}
                      {data?.receipt && (
                        <PrimaryButton
                          label={<TfiDownload />}
                          style={"w-fit group"}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          <div className="flex items-center mt-10 justify-end flex-wrap">
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
  );
}
