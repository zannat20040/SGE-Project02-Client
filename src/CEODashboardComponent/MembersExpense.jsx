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

export default function MembersExpense() {
  const [active, setActive] = useState(1);
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const itemsPerPage = 10;
  const { userinfo } = useUserInfo();

  const {
    data: membersExpenseHistory,
    isLoading,
  } = useQuery({
    queryKey: ["membersExpenseHistory", user?.email],
    queryFn: async () => {
      const url =
        userinfo.role === "ceo"
          ? `/users/expenses`
          : `/users/expenses?branch=${userinfo.branch}`;

      const response = await axiosBase.get(url, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      const data = response?.data || [];

      return data;
    },
  });

  
  console.log(membersExpenseHistory)

  // pagination start from here
  const totalPages = Math.ceil(
    membersExpenseHistory?.result?.length / itemsPerPage
  );

  // Calculate paginated data
  const paginatedData =
    membersExpenseHistory?.result?.length > 0 &&
    [...membersExpenseHistory?.result]
      .reverse()
      .slice((active - 1) * itemsPerPage, active * itemsPerPage);

  // pagination function
  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div>
        {/* breadcrumbs add */}
        <BreadcrumsLayout
          route1={"ceo"}
          activeroute2={"individualMembersExpense "}
        />

        {/* table */}
        <div className="bg-white px-6 py-10 mt-3">
          {/* table data */}

          <div className="overflow-x-auto mt-8 ">
            <table className="table table-xs text-center ">
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
                {paginatedData?.length <= 0 ? (
                  <p>No data available</p>
                ) : (
                  <>
                    {paginatedData &&
                      paginatedData?.map((data, idx) => (
                        <tr className="hover" key={data._id}>
                          <td>{idx + 1}</td>
                          <td>{data?.username} </td>
                          <td>{data?.email}</td>
                          <td className="font-bold text-yellow-800">
                            ${parseFloat(data?.totalAmount).toFixed(2)}
                          </td>
                         
                          <td>{data?.branch}</td>
                          <td
                            className={`font-bold text-xs  rounded  !capitalize ${
                              data.status === "auto granted" ||
                              data.status === "granted"
                                ? "text-green-600 bg-green-300"
                                : data.status === "rejected"
                                ? "text-red-600 bg-red-300"
                                : "text-orange-800 bg-orange-300"
                            } `}
                          >
                            <Button
                              type="submit"
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
        </div>
      </div>
    </div>
  );
}
