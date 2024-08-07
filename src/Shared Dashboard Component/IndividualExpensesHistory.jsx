import React, { useContext, useRef, useState } from "react";
import PaginationLayout from "../Shared Component/PaginationLayout";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import PrintEmployeeHistory from "./PrintEmployeeHistory";
import { Button } from "@material-tailwind/react";
import Loading from "../Shared Component/Loading";
import useUserInfo from "../Hooks & Context/useUserInfo";

export default function IndividualExpensesHistory() {
  const [active, setActive] = useState(1);
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const { userinfo } = useUserInfo();

  // print function
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    data: allExpenseHistory,
    refetch,
    isLoading,
    error,
    isFetching
  } = useQuery({
    queryKey: ["allExpenseHistory", user?.email, active],
    queryFn: async () => {
      const response = await axiosBase.get(`/expenses/?page=${active}`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      const data = response?.data || [];

      return data;
    },
  });

  console.log(allExpenseHistory)

  // pagination start from here

  const totalPages = allExpenseHistory?.totalPages;

  // pagination function
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
  const expenses = allExpenseHistory?.expenses?.slice().reverse() || [];

  if (isLoading) return <Loading />;

  return (
    <div>
      <div>
        {/* breadcrumbs add */}
        <BreadcrumsLayout route1={userinfo?.role} activeroute2={"allhistory"} />

        {/* table */}
        <div className="bg-white px-6 py-10 ">
          <Button
            onClick={handlePrint} //use tthis print function
            type="submit"
            className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none  w-fit `}
          >
            Print All Exployee History
          </Button>
          <PrintEmployeeHistory ref={componentRef} />

          {/* table data */}

          <div className="overflow-x-auto mt-8 ">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color  ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Total Expenses</th>
                </tr>
              </thead>
              <tbody>
                {expenses?.map((data, idx) => (
                  <tr className="hover" key={data?._id}>
                    <td>{idx + 1}</td>
                    <td>{data?.expenseTitle}</td>
                    <td>{data?.email}</td>
                    <td
                      className={`font-medium text-xs  rounded  !capitalize ${
                        data.status === "auto granted" ||
                        data.status === "granted"
                          ? "text-green-600"
                          : data.status === "rejected"
                          ? "text-red-600"
                          : "text-orange-800"
                      } `}
                    >
                      {data?.status}
                    </td>
                    <td>{data?.role}</td>
                    <td className="font-bold text-yellow-800">${data?.amount}</td>
                    
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
                isFetching={isFetching}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
