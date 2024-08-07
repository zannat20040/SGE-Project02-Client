import React, { useContext, useRef, useState } from "react";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUserInfo from "../Hooks & Context/useUserInfo";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared Component/Loading";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import PaginationLayout from "../Shared Component/PaginationLayout";
import PrintEmployeeHistory from "../Shared Dashboard Component/PrintEmployeeHistory";
import { Button } from "@material-tailwind/react";
import { IoIosPrint } from "react-icons/io";

export default function MembersExpense() {
  const [active, setActive] = useState(1);
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const itemsPerPage = 10;

  const {
    data: membersExpenseHistory,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["membersExpenseHistory", user?.email],
    queryFn: async () => {
      const response = await axiosBase.get(`/ceo/getUsers`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      const data = response?.data || [];

      return data;
    },
  });

  // pagination start from here
  const totalPages = Math.ceil(
    membersExpenseHistory?.users?.length / itemsPerPage
  );

  // Calculate paginated data
  const paginatedData =
    membersExpenseHistory?.users?.length > 0 &&
    [...membersExpenseHistory?.users]
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
        <div className="bg-white px-6 py-10 ">
          <Button
            type="submit"
            className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none  w-fit `}
          >
            Print All Exployee History
          </Button>
          {/* <PrintEmployeeHistory ref={componentRef} /> */}

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
                {paginatedData?.map((data, idx) => (
                  <tr className="hover">
                    <td>{idx + 1}</td>
                    <td>{data?.firstName + data?.lastName} </td>
                    <td>{data?.email}</td>
                    <td>{data?.email}</td>
                    <td>{data?.branch}</td>
                    <td
                      className={`font-bold text-xs  rounded  !capitalize ${
                        data.status === "auto granted" ||
                        data.status === "granted"
                          ? "text-green-600"
                          : data.status === "rejected"
                          ? "text-red-600"
                          : "text-orange-800"
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
