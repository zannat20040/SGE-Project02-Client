import React, { forwardRef, useContext } from "react";
import { Chip } from "@material-tailwind/react";
import { AiOutlineGlobal } from "react-icons/ai";
import useGetExpense from "../Hooks & Context/useGetExpense";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MemberHistoryDownload = forwardRef((props, ref) => {
  const { tableData, refetch, isLoading } = useGetExpense();
  const { user } = useContext(AuthContext);

  // object
  // const tableData = [
  //   {
  //     id: 1,
  //     name: "Cy Ganderton",
  //     amount: "$500.00",
  //     position: "Quality Control Specialist",
  //     status: "Added",
  //     date: "12/16/2020",
  //   },
  //   {
  //     id: 2,
  //     name: "Hart Hagerty",
  //     amount: "$750.00",
  //     position: "Desktop Support Technician",
  //     status: "Decline",
  //     date: "12/5/2020",
  //   },
  //   {
  //     id: 3,
  //     name: "Brice Swyre",
  //     amount: "$300.00",
  //     position: "Tax Accountant",
  //     status: "Pending",
  //     date: "8/15/2020",
  //   },
  // ];
  console.log(tableData);

  return (
    <div className="hidden print:flex w-full" ref={ref}>
      {isLoading ? (
        "Loading"
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
              <p className="text-gray-600 text-xs">
                London E1 7RA United Kingdom.
              </p>
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
                {tableData?.map((data, index) => (
                  <tr className="hover">
                    <td>{index + 1}</td>
                    <td>{data?.expenseTitle}</td>
                    <td>{data?.amount}</td>
                    {/* status */}
                    <td className="">
                      <p
                        className={`font-medium text-xs rounded !capitalize ${
                          data.status === "Added"
                            ? "text-green-600"
                            : data.status === "Decline"
                            ? "text-red-600"
                            : "text-orange-800"
                        }`}
                      >
                        {data?.status}
                      </p>
                    </td>
                    <td>{data?.date?.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
});

MemberHistoryDownload.displayName = "MemberHistoryDownload";

export default MemberHistoryDownload;
