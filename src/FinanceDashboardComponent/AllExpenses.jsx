import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import { CiCalendarDate } from "react-icons/ci";
import { Chip } from "@material-tailwind/react";
import PaginationLayout from "../Shared Component/PaginationLayout";
import useUserInfo from "../Hooks & Context/useUserInfo";
import useBranchExpense from "../Hooks & Context/useBranchExpense";
import NotesModal from "../Shared Component/NotesModal";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import ButtonLoading from "../Shared Component/ButtonLoading";
import swal from "sweetalert";
import FileDownload from "../Shared Component/FileDownload";
import PreviewReceipt from "../Shared Component/PreviewReceipt";

export default function AllExpenses() {
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const { userinfo } = useUserInfo();
  const [loadingItems, setLoadingItems] = useState({});
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const { branchExpenses, refetch, isLoading, error } = useBranchExpense(
    userinfo?.branch
  );
  const [searchQuery, setSearchQuery] = useState("");

  // pagination start from here
  const [active, setActive] = useState(1);

  // data & email filter
  const filteredData = branchExpenses?.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);
    const emailMatch = item.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return (
      (!startDate || itemDate >= fromDate) &&
      (!endDate || itemDate <= toDate) &&
      (!searchQuery || emailMatch)
    );
  });

  const itemsPerPage = 10; // Show one item per page
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

  // status form
  const HandleReciptStatus = async (e, id) => {
    e.preventDefault();
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    const expenseStatus = e.target.status.value;

    try {
      const response = await axiosBase.patch(
        `/finance/changeExpenseStatus/${id}`,
        { status: expenseStatus },
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      swal("Great", response.data.message, "success");
      refetch();
    } catch (err) {
      e.target.reset();
      swal("Ops", "Something went wrong", "error");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div>
      <div>
        {/* breadcrumbs add */}
        <BreadcrumsLayout route1={"finance"} activeroute2={"allexpenses"} />

        <div className="bg-white px-6 py-10 mt-6 ">
          <div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-2  mb-6">
            {/* filter by date */}
            <form className="grid grid-cols-2 lg:w-1/3 sm:w-2/3 w-full">
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
            {/* filter by email */}
            <label className="bg-white input outline-none input-bordered flex items-center gap-2  border-gray-200 lg:w-1/3 w-full text-sm rounded-none h-10">
              <input
                type="text"
                className="grow outline-none"
                placeholder="Search by employee email"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          {/* table data */}
          <div className="overflow-x-auto">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color border-b border-gray-300 ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4 text-start">Details</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Note</th>
                  <th className="pb-4">See Recipt</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className="text-primary-color border-b border-gray-300 ">
                    <td colSpan="9" className="text-center py-4">
                      <ButtonLoading />
                    </td>
                  </tr>
                ) : paginatedData && paginatedData?.length <= 0 ? (
                  <tr className="text-primary-color border-b border-gray-300 ">
                    <td colSpan="9" className="text-center py-4 text-black">
                      No data available
                    </td>
                  </tr>
                ) : (
                  paginatedData?.map((data, idx) => (
                    <tr
                      className=" hover:bg-gray-100 border-b border-gray-200  "
                      key={data?._id}
                    >
                      <td>{idx + 1}</td>
                      <td className="text-start">
                        <p>{data?.username}</p>
                        <p className="text-xs text-gray-500">{data?.email}</p>
                      </td>
                      <td>{data?.expenseTitle}</td>
                      <td>${data?.amount}</td>
                      {/* status change form */}
                      <td>
                        {data?.status === "pending" ? (
                          <form
                            className="border rounded flex w-full justify-between mx-auto"
                            onSubmit={(e) => HandleReciptStatus(e, data?._id)}
                          >
                            <select
                              required
                              name="status"
                              id="status"
                              defaultValue=""
                              className="w-full bg-white hover:bg-gray-100 rounded-none outline-0 border-gray-200 block w p-2 text-gray-400 text-xs"
                            >
                              <option value="" disabled hidden>
                                Pending
                              </option>
                              <option
                                className="text-black text-xs capitalize"
                                value="granted"
                              >
                                Granted
                              </option>
                              <option
                                className="text-black text-xs"
                                value="rejected"
                              >
                                Rejected
                              </option>
                            </select>
                            <button
                              type="submit"
                              className="text-white top-0 bottom-0 my-auto bg-primary-color p-2 rounded outline-none focus:border-0 focus:!outline-none h-fit"
                            >
                              {loadingItems[data._id] ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                <FaCheck className="text-xs" />
                              )}
                            </button>
                          </form>
                        ) : (
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
                            className={`font-bold text-xs rounded !capitalize ${
                              data.status === "auto granted" ||
                              data.status === "granted"
                                ? "text-green-600"
                                : data.status === "rejected"
                                ? "text-red-600"
                                : "text-orange-800"
                            }`}
                          />
                        )}
                      </td>
                      <td>{data?.role}</td>
                      <td>{data?.date?.split("T")[0]}</td>
                      <td className=" gap-2 justify-center">
                        {data?.notes ? (
                          <NotesModal notes={data?.notes} />
                        ) : (
                          <p className="text-xs">No notes</p>
                        )}
                      </td>
                      <td>
                        {data?.receipt?.length > 0 ? (
                          <div className="flex gap-1 justify-center">
                            <PreviewReceipt data={data} />
                            <FileDownload data={data} />
                          </div>
                        ) : (
                          <p className="text-xs">Not available</p>
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
    </div>
  );
}
