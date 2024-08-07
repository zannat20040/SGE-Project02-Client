import React, { useContext, useState } from "react";
import { TfiDownload } from "react-icons/tfi";
import PrimaryButton from "../Shared Component/PrimaryButton";
import PaginationLayout from "../Shared Component/PaginationLayout";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import Loading from "../Shared Component/Loading";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export default function IndividualExpensesHistory() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(1);
  const itemsPerPage = 5;

  // tabledata
  const tableData = [
    {
      id: 1,
      memberName: "Member Name",
      memberEmail: "memberemail@gmail.com",
      amount: "$500.00",
      role: "Employee",
    },
    {
      id: 2,
      memberName: "Member Name",
      memberEmail: "ceo@gmail.com",
      amount: "$500.00",
      role: "CEO",
    },
    {
      id: 3,
      memberName: "Member Name",
      memberEmail: "memberemail@gmail.com",
      amount: "$500.00",
      role: "Employee",
    },
  ];

  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const {
    data: allExpenseHistory,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allExpenseHistory", user?.email],
    queryFn: async () => {
      const response = await axiosBase.get(
        `/expenses/?page=${active}number=${5}`,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      const data = response.data || [];
      console.log(data);

      const reversedData = data?.expenses|| [];
    return {
      expenses: reversedData,
      totalPages: data.totalPages,
    };
    },
  });

  console.log(allExpenseHistory?.expenses);

  // pagination start from here

  // date filter
  const filteredData = allExpenseHistory?.expenses?.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    return (
      (!startDate || itemDate >= fromDate) && (!endDate || itemDate <= toDate)
    );
  });

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalPages = allExpenseHistory?.totalPages;

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
      <div>
        {/* breadcrumbs add */}
        <BreadcrumsLayout route1={"ceo"} activeroute2={"allhistory"} />
        {/* {loading && <Loading />} */}
        {/* table */}
        <div className="bg-white px-6 py-10 mt-6 ">
          {/* table data */}

          <div className="overflow-x-auto">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color  ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Total Expenses</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Expenses Statement</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((data,idx) => (
                  <tr className="hover" key={data?._id}>
                    <td>{idx+1}</td>
                    <td>{data?.expenseTitle}</td>
                    <td>{data?.email}</td>
                    <td>{data?.amount}</td>
                    <td>{data?.role}</td>
                    <td className="flex gap-2 justify-center">
                      <PrimaryButton label={<TfiDownload />} style={"w-fit"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex md:justify-between justify-end gap-5 items-center mt-10 flex-wrap">
            <PrimaryButton label={"Print All History"} style={"w-fit"} />

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
