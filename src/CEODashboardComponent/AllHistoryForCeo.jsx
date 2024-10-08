import React, { useContext, useRef, useState } from "react";
import PaginationLayout from "../Shared Component/PaginationLayout";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { Button, Radio } from "@material-tailwind/react";
import useUserInfo from "../Hooks & Context/useUserInfo";
import ButtonLoading from "../Shared Component/ButtonLoading";
import MemberHistoryDownload from "../PrintHistory/MemberHistoryDownload";
import FileDownload from "../Shared Component/FileDownload";
import NotesModal from "../Shared Component/NotesModal";
import PreviewReceipt from "../Shared Component/PreviewReceipt";

export default function AllHistoryForCeo() {
  const [active, setActive] = useState(1);
  const [selectedRadio, setSelectedRadio] = useState("my-expenses"); // State to track selected radio
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const { userinfo } = useUserInfo();
  const componentRef = useRef();
  const itemsPerPage = 10;

  // print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Function to fetch expenses
  const fetchExpenses = async () => {
    // end-point based on selected radio
    const url =
      selectedRadio === "my-expenses"
        ? `/expense/${user?.email}`
        : `/expenses/?page=${active}`;

    const response = await axiosBase.get(url, {
      headers: {
        Authorization: `Bearer ${user?.email}`,
      },
    });

    // data get based on selected radio
    const data =
      selectedRadio === "my-expenses"
        ? response?.data?.data?.slice().reverse() || []
        : response?.data || [];

    return data || [];
  };

  // Query to fetch expenses based on selected radio button
  const {
    data: allExpenseHistory = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["allExpenseHistory", selectedRadio, user?.email, active],
    queryFn: fetchExpenses,
    keepPreviousData: true,
  });

  //   total page count base on selected radio
  const totalPages =
    selectedRadio === "my-expenses"
      ? Math.ceil((allExpenseHistory?.length || 0) / itemsPerPage)
      : allExpenseHistory?.totalPages || 0;

  // Calculate paginated data base on selected data

  const paginatedData =
    selectedRadio === "my-expenses"
      ? (allExpenseHistory || []).slice(
          (active - 1) * itemsPerPage,
          active * itemsPerPage
        )
      : allExpenseHistory?.expenses || [];

  const next = () => {
    if (active === totalPages || isFetching) return;
    setActive(active + 1);
    refetch();
  };

  const prev = () => {
    if (active === 1 || isFetching) return;
    setActive(active - 1);
    refetch();
  };

  // Handle radio button change
  const handleRadioChange = (value) => {
    setSelectedRadio(value);
    setActive(1); // Reset pagination when changing radio button
  };

  return (
    <div>
      <BreadcrumsLayout route1={userinfo?.role} activeroute2={"allhistory"} />

      <div className="bg-white px-6 py-10 ">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-5 items-center flex-row ">
          <Button
            onClick={handlePrint}
            type="submit"
            className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none  md:w-fit w-full `}
          >
            Print My History
          </Button>
          <MemberHistoryDownload ref={componentRef} />
          {/* expenses history type */}
          <div className="flex gap-2 text-sm">
            <Radio
              name="type"
              label="All Expenses"
              checked={selectedRadio === "all-expenses"}
              onChange={() => handleRadioChange("all-expenses")}
              color="amber"
            />
            <Radio
              name="type"
              label="My Expenses"
              checked={selectedRadio === "my-expenses"}
              onChange={() => handleRadioChange("my-expenses")}
              color="amber"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-8 ">
          <table className="table table-xs text-center ">
            <thead>
              <tr className="text-primary-color border-b border-gray-300 ">
                <th className="pb-4">No.</th>
                <th className="pb-4">Title</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Expenses</th>

                {selectedRadio === "my-expenses" && (
                  <>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Note</th>
                    <th className="pb-4">Recipt</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
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
                paginatedData?.map((data, idx) => (
                  <tr
                    className=" hover:bg-gray-100 border-b border-gray-200"
                    key={data?._id}
                  >
                    <td className="p-2">{idx + 1}</td>
                    <td>{data?.expenseTitle}</td>
                    <td>{data?.email}</td>
                    <td className="text-center p-2">
                      <p
                        className={`font-semibold text-xs mx-auto rounded w-fit capitalize px-3 py-1 text-center ${
                          data.status === "auto granted" ||
                          data.status === "granted"
                            ? "text-green-600 bg-green-100"
                            : data.status === "rejected"
                            ? "text-red-600 bg-red-100"
                            : "text-orange-800 bg-orange-100"
                        }`}
                      >
                        {data?.status}
                      </p>
                    </td>

                    <td>{data?.role}</td>
                    <td className="font-bold text-yellow-800">
                      ${parseFloat(data?.amount).toFixed(2)}{" "}
                    </td>

                    {selectedRadio === "my-expenses" && (
                      <>
                        <td>{data?.date?.split("T")[0]}</td>
                        <td className="flex gap-2 justify-center">
                          {data?.notes ? (
                            <NotesModal notes={data?.notes} />
                          ) : (
                            <p className="text-xs">No notes</p>
                          )}
                        </td>
                        {/* downlaod */}
                        <td>
                          {data?.receipt?.length > 0 ? (
                            <div className="flex gap-1 justify-center">
                              <PreviewReceipt data={data} />
                              <FileDownload data={data} />
                            </div>
                          ) : (
                            "No Files"
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-5 items-center mt-10 flex-wrap">
          <div className="flex items-center justify-end flex-wrap">
            <PaginationLayout
              prev={prev}
              next={next}
              active={active}
              setActive={setActive}
              totalPages={totalPages}
              isFetching={isFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
