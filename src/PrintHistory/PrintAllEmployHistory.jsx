import React, { forwardRef, useContext } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUserInfo from "../Hooks & Context/useUserInfo";
import { useQuery } from "@tanstack/react-query";
// using
const PrintAllEmployHistory = forwardRef((props, ref) => {
  const { user } = useContext(AuthContext);
  const { userinfo } = useUserInfo();

  const { data: membersExpenseHistory, isLoading } = useQuery({
    queryKey: ["membersExpenseHistory", user?.email],
    queryFn: async () => {
     
      const response = await axiosBase.get(`/users/expenses?branch=${userinfo?.branch}`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      const data = response?.data?.result || [];

      return data;
    },
  });


  return (
    <div className="hidden print:flex w-full" ref={ref}>
      {isLoading ? (
        "Loading...."
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
              <p className="text-gray-600 text-xs">Finance name</p>
              <p className="text-gray-600 text-xs">Branch Address</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">From</p>
              <p className="text-gray-600 text-xs">{user?.displayName}</p>
              <p className="text-gray-600 text-xs">{user?.email}</p>
              <p className="text-gray-600 text-xs">{userinfo?.branch}</p>
            </div>
          </div>

          <div className="overflow-x-auto mt-20">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color ">
                  <th className="pb-4">#No.</th>
                  <th className="pb-4 text-start">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Total Expense</th>
                  <th className="pb-4">Branch</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      Loading......
                    </td>
                  </tr>
                ) : membersExpenseHistory &&
                  membersExpenseHistory?.length <= 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-black">
                      No data available
                    </td>
                  </tr>
                ) : (
                  <>
                    {membersExpenseHistory &&
                      membersExpenseHistory?.map((data, idx) => (
                        <tr className="hover" key={data?._id}>
                          <td>{idx + 1}</td>
                          <td className="text-start">{data?.username} </td>
                          <td>{data?.email}</td>
                          <td className="font-bold text-yellow-800 py-3">
                            ${parseFloat(data?.totalAmount).toFixed(2)}
                          </td>
                          <td>{data?.branch}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
});

PrintAllEmployHistory.displayName = "PrintAllEmployHistory";

export default PrintAllEmployHistory;
