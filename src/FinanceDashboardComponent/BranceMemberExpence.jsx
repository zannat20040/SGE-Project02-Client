import React, { useContext, useState } from "react";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../Hooks & Context/useUserInfo";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import { Button } from "@material-tailwind/react";
import { IoIosPrint } from "react-icons/io";
import PaginationLayout from "../Shared Component/PaginationLayout";
import Loading from "../Shared Component/Loading";

export default function BranceMemberExpence() {
  const [active, setActive] = useState(1);
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const itemsPerPage = 10;
  const { userinfo } = useUserInfo();

  const {
    data: membersExpenseHistory,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["membersExpenseHistory", user?.email],
    queryFn: async () => {
      const response = await axiosBase.get(
        `/ceo/getUsers?branch=${userinfo.branch}`,
        {
          headers: {
            Authorization: `Bearer ceo@gmail.com`,
          },
        }
      );
      return response.data || { users: [] }; // Ensure it always returns an object with a `users` array
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  // Ensure `users` is an array
  const users = Array.isArray(membersExpenseHistory?.users)
    ? membersExpenseHistory.users
    : [];

  // Pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedData = users
    .reverse()
    .slice((active - 1) * itemsPerPage, active * itemsPerPage);

  // Pagination functions
  const next = () => {
    if (active < totalPages) setActive(active + 1);
  };

  const prev = () => {
    if (active > 1) setActive(active - 1);
  };

  return (
    <div>
      <div>
        {/* Breadcrumbs */}
        <BreadcrumsLayout
          route1={"finance"}
          activeroute2={"individualMembersExpense"}
        />

        {/* Table */}
        <div className="bg-white px-6 py-10">
          <Button
            type="button"
            className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-fit`}
          >
            Print All Employee History
          </Button>

          {/* Table Data */}
          <div className="overflow-x-auto mt-8">
            <table className="table table-xs text-center">
              <thead>
                <tr className="text-primary-color">
                  <th className="pb-4">No.</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Total Expense</th>
                  <th className="pb-4">Branch</th>
                  <th className="pb-4">Expenses Statement</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                  paginatedData.map((data, idx) => (
                    <tr className="hover" key={data.email}>
                      <td>{(active - 1) * itemsPerPage + idx + 1}</td>
                      <td>
                        {data.firstName} {data.lastName}
                      </td>
                      <td>{data.email}</td>
                      <td>{data.totalExpense || 0}</td>
                      <td>{data.branch}</td>
                      <td
                        className={`font-bold text-xs rounded !capitalize ${
                          data.status === "auto granted" ||
                          data.status === "granted"
                            ? "text-green-600"
                            : data.status === "rejected"
                            ? "text-red-600"
                            : "text-orange-800"
                        }`}
                      >
                        <Button
                          type="button"
                          className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-fit`}
                        >
                          <IoIosPrint />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-5 items-center mt-10 flex-wrap">
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
