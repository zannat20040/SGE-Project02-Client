import React, { useState } from "react";
import { Chip } from "@material-tailwind/react";
import { TfiDownload } from "react-icons/tfi";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import PaginationLayout from "../Shared Component/PaginationLayout";
import { CiCalendarDate } from "react-icons/ci";

export default function ExpenseHistory() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // object
  const tableData = [
    {
      id: 1,
      name: "Cy Ganderton",
      amount: "$500.00",
      position: "Quality Control Specialist",
      status: "Added",
      date: "12/16/2020",
    },
    {
      id: 2,
      name: "Hart Hagerty",
      amount: "$750.00",
      position: "Desktop Support Technician",
      status: "Decline",
      date: "12/5/2020",
    },
    {
      id: 3,
      name: "Brice Swyre",
      amount: "$300.00",
      position: "Tax Accountant",
      status: "Pending",
      date: "8/15/2020",
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

 

  return (
    <div>
      {/* breadcrumbs add */}
      <BreadcrumsLayout route1={"employee"} activeroute2={"history"} />

      {/* table */}
      <div className="bg-white px-6 py-10 mt-6 ">
        {/* filter by date */}
        <form className="grid grid-cols-2 lg:w-1/3 sm:w-2/3 w-full mb-6">
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
                <th className="pb-4">Title</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Catagory</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Recipt</th>
              </tr>
            </thead>
            <tbody>
              {/* tr-1 */}
              {paginatedData?.map((data) => (
                <tr className="hover">
                  <td>{data?.id}</td>
                  <td>{data?.name}</td>
                  <td>{data?.amount}</td>
                  <td>{data?.position}</td>
                  {/* status */}
                  <td className="">
                    <Chip
                      variant="ghost"
                      color={
                        data.status === "Added"
                          ? "green"
                          : data.status === "Decline"
                          ? "red"
                          : "orange"
                      }
                      size="sm"
                      value={data?.status}
                      className={`font-bold text-xs  rounded  !capitalize ${
                        data.status === "Added"
                          ? "text-green-600"
                          : data.status === "Decline"
                          ? "text-red-600"
                          : "text-orange-800"
                      } `}
                    />
                  </td>
                  <td>{data?.date}</td>
                  {/* downlaod */}
                  <td>
                    <ButtonOutlined label={<TfiDownload />} style={"w-fit"} />
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
  );
}
