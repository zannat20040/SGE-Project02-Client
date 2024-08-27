import React, { useContext, useRef, useState } from "react";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUserInfo from "../Hooks & Context/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared Component/Loading";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import PaginationLayout from "../Shared Component/PaginationLayout";
import { Button } from "@material-tailwind/react";
import { IoIosPrint } from "react-icons/io";
import ButtonLoading from "../Shared Component/ButtonLoading";
import MemberHistoryDownload from "../PrintHistory/MemberHistoryDownload";
import { useReactToPrint } from "react-to-print";
import IndividualExpenseHistory from "../PrintHistory/IndividualExpenseHistory";
import PrintAllEmployHistory from "../PrintHistory/PrintAllEmployHistory";

export default function MembersExpense() {
  const [active, setActive] = useState(1);
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const { userinfo } = useUserInfo();
  const itemsPerPage = 10;
  const printAllRef = useRef();
  const printAllSingle = useRef();
  const [employeeEmail, setEmployeeEmail] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);

  // print
  const handlePrintAll = useReactToPrint({
    content: () => printAllRef.current,
  });
  // print single data
  const handlePrintASingle = (email,name) => {
    setEmployeeEmail(email);
    setEmployeeName(name)
  };

  // members short history
  const { data: membersExpenseHistory, isLoading } = useQuery({
    queryKey: ["membersExpenseHistory", user?.email],
    queryFn: async () => {
      const url =
        userinfo.role === "ceo"
          ? `/users/expenses`
          : `/users/expenses?branch=${userinfo?.branch}`;

      const response = await axiosBase.get(url, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      const data = response?.data?.result || [];

      return data;
    },
  });

  // pagination start from here
  const totalPages = Math.ceil(membersExpenseHistory?.length / itemsPerPage);

  // Calculate paginated data
  const paginatedData = membersExpenseHistory?.length
    ? [...membersExpenseHistory]
        .reverse()
        .slice((active - 1) * itemsPerPage, active * itemsPerPage)
    : [];

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
        <BreadcrumsLayout route1={"ceo"} activeroute2={"expenseoverview "} />

        {/* table */}
        <div className="bg-white px-6 py-10 mt-3 ">
          {/* table data */}

          <div className="overflow-x-auto  ">
            <div className="mb-10">
              <Button
                type="submit"
                onClick={handlePrintAll}
                className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none  sm:w-fit w-full `}
              >
                Print overview
              </Button>
            </div>
            <table className="table table-xs text-center ">
              <PrintAllEmployHistory ref={printAllRef} />

              <thead>
                <tr className="text-primary-color  ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Total Expense</th>
                  <th className="pb-4">Branch</th>
                  <th className="pb-4">Expenses Statement</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <ButtonLoading />
                    </td>
                  </tr>
                ) : paginatedData && paginatedData?.length <= 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-black">
                      No data available
                    </td>
                  </tr>
                ) : (
                  <>
                    {paginatedData &&
                      paginatedData?.map((data, idx) => (
                        <tr className="hover" key={data?._id}>
                          <td>{idx + 1}</td>
                          <td>{data?.username} </td>
                          <td>{data?.email}</td>
                          <td className="font-bold text-yellow-800">
                            ${parseFloat(data?.totalAmount).toFixed(2)}
                          </td>

                          <td>{data?.branch}</td>
                          <td
                            className={`font-bold text-xs  rounded  !capitalize `}
                          >
                            <Button
                              type="submit"
                              onClick={() => handlePrintASingle(data?.email, data?.username)}
                              className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none  w-fit
                        }`}
                            >
                              <IoIosPrint className="" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-5 items-center mt-10 flex-wrap">
            {/*pagination */}
            <div className="flex items-center  justify-end flex-wrap">
              <PaginationLayout
                prev={prev}
                next={next}
                active={active}
                setActive={setActive}
                totalPages={totalPages}
              />
            </div>
          </div>

          {employeeEmail && (
            <div className="hidden">
              <IndividualExpenseHistory
                employeeEmail={employeeEmail}
                setEmployeeEmail={setEmployeeEmail}
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
                ref={printAllSingle}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
