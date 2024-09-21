import React, { forwardRef, useContext } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import useGetExpense from "../Hooks & Context/useGetExpense";
import useUserInfo from "../Hooks & Context/useUserInfo";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useGetExpenseContext } from "../Hooks & Context/ExpenseContext";
// using
const MemberHistoryDownload = forwardRef((props, ref) => {
  const { userinfo } = useUserInfo();
  const { user } = useContext(AuthContext);
  const { tableData, isLoading } = useGetExpense();
  const { totalAmount } = useGetExpenseContext(user?.email) || {};

  return (
    <div className="hidden print:flex w-full" ref={ref}>
      {isLoading ? (
        <p className="p-10">Loading....</p>
      ) : (
        <div className="p-10 w-full">
          <div className="grid grid-cols-2 justify-between ">
            {/* company details */}
            <div>
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-3xl rounded-full h-10 w-10" />
              <h1 className="font-bold text-2xl uppercase text-primary-color ">
                SGE
              </h1>
              <div className="mt-1">
                <p className="text-gray-600 text-xs">Shabuj Global Education</p>
                <p className="text-gray-600 text-xs">
                  1st Floor, 94A Whitechapel High Street
                </p>
                <p className="text-gray-600 text-xs">
                  London E1 7RA United Kingdom.
                </p>
                <p className="text-gray-600 text-xs">Tel: (+44) 7404016346</p>
                <p className="text-gray-600 text-xs">
                  E-mail: info@shabujglobal.com
                </p>
              </div>
            </div>

            {/* printing details */}
            <div className="text-end">
              <h1 className="font-bold text-primary-color uppercase text-3xl">
                Reports
              </h1>
              <p className="text-gray-600 text-xs">
                Date:{" "}
                {new Date().toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-600 text-xs">
                Time:{" "}
                {new Date().toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* employee details */}
          <div className="grid grid-cols-2 gap-4 p-10 bg-[#7c7c004f] rounded-md mt-10">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Issued by
              </p>
              <p className="text-gray-600 text-xs">{user?.displayName}</p>
              <p className="text-gray-600 text-xs">{user?.email}</p>
              <p className="text-gray-600 text-xs">{userinfo?.branch}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">From</p>
              <p className="text-gray-600 text-xs">Finance name</p>
              <p className="text-gray-600 text-xs">Branch Address</p>
            </div>
          </div>

          <div className="overflow-x-auto mt-20">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color ">
                  <th className="pb-4">#No</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData && tableData?.length <= 0 ? (
                  <tr>
                    <td colSpan="9">
                      <p className="text-center p-5">No data found</p>
                    </td>
                  </tr>
                ) : (
                  tableData?.map((data, index) => (
                    <tr className="hover" key={data?._id}>
                      <td>{index + 1}</td>
                      <td>{data?.expenseTitle}</td>
                      <td>${data?.amount}</td>
                      {/* status */}
                      <td className="p-2 flex justify-center">
                        <p
                          className={`font-semibold text-xs rounded w-fit capitalize px-3 py-1 text-center ${
                            data.status === "auto granted" ||
                            data.status === "granted"
                              ? "text-green-600 "
                              : data.status === "rejected"
                              ? "text-red-600 "
                              : "text-orange-800 "
                          } `}
                        >
                          {data?.status}
                        </p>
                      </td>
                      <td>{data?.date?.split("T")[0]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <hr className="w-full h-1" />
            <div className="mt-4 text-end  ">
              <p>
                Total Expenses :{" "}
                <span className="font-bold text-primary-color">
                  ${parseFloat(totalAmount).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

MemberHistoryDownload.displayName = "MemberHistoryDownload";

export default MemberHistoryDownload;
