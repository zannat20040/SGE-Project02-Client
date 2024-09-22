import React, { useContext, useState } from "react";
import { Button, Chip } from "@material-tailwind/react";
import { TfiDownload } from "react-icons/tfi";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import PaginationLayout from "../Shared Component/PaginationLayout";
import { CiCalendarDate } from "react-icons/ci";
import useGetExpense from "../Hooks & Context/useGetExpense";
import ButtonLoading from "../Shared Component/ButtonLoading";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import FileDownload from "../Shared Component/FileDownload";
import NotesModal from "../Shared Component/NotesModal";

export default function ExpenseHistory() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(1);
  const itemsPerPage = 10;
  const { tableData, isLoading } = useGetExpense();

  // date filter
  const filteredData = tableData?.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    return (
      (!startDate || itemDate >= fromDate) && (!endDate || itemDate <= toDate)
    );
  });

  // pagination start from here
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  // Calculate paginated data
  const paginatedData = filteredData?.slice(
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
              className="bg-white hover:bg-gray-100  rounded-none outline-0 border-gray-200  text-sm block w-full ps-10 p-2.5 text-gray-400  border"
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
              className="bg-white hover:bg-gray-100  rounded-none outline-0 border-gray-200  text-sm block w-full ps-10 p-2.5 text-gray-400  border border-l-0"
              placeholder="To"
            />
          </div>
        </form>
        {/* table data */}
        <div className="overflow-x-auto">
          <table className="table table-xs text-center ">
            <thead>
              <tr className="text-primary-color border-b border-gray-300 ">
                <th className="pb-4">No.</th>
                <th className="pb-4">Title</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Note</th>
                <th className="pb-4">Recipt</th>
              </tr>
            </thead>
            <tbody>
              {/* tr-1 */}
              {isLoading ? (
                <tr className="border-b border-gray-200">
                  <td colSpan="6" className="py-4 text-center">
                    <ButtonLoading />
                  </td>
                </tr>
              ) : paginatedData && paginatedData?.length <= 0 ? (
                <tr className="border-b border-gray-200">
                  <td colSpan="9" className="text-center py-4 text-black">
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedData?.map((data, index) => (
                  <tr
                    className="hover:bg-gray-200 border-b border-gray-200 "
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <td>{data?.expenseTitle}</td>
                    <td>${data?.amount}</td>
                    {/* status */}
                    <td className="">
                      <Chip
                        variant="ghost"
                        color={
                          data.status === "auto granted" ||
                          data.status === "granted"
                            ? "green"
                            : data.status === "rejected"
                            ? "red"
                            : "orange"
                        }
                        size="sm"
                        value={data?.status}
                        className={`font-bold text-xs  rounded  !capitalize ${
                          data.status === "auto granted" ||
                          data.status === "granted"
                            ? "text-green-600"
                            : data.status === "rejected"
                            ? "text-red-600"
                            : "text-orange-800"
                        } `}
                      />
                    </td>
                    <td>{data?.date?.split("T")[0]}</td>
                    <td>
                      {data?.notes ? (
                        <NotesModal notes={data?.notes} />
                      ) : (
                        <p className="text-xs">No notes</p>
                      )}
                    </td>
                    {/* downlaod */}
                    <td>
                      {data?.receipt?.length > 0 ? (
                        <FileDownload data={data} />
                      ) : (
                        "No Files"
                      )}
                    </td>
                  </tr>
                ))
              )}
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
