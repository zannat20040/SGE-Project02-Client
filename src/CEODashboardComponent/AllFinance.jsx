import React, { useContext, useState } from "react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useUserInfo from "../Hooks & Context/useUserInfo";
import ButtonLoading from "../Shared Component/ButtonLoading";
import PaginationLayout from "../Shared Component/PaginationLayout";
import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Select } from "antd";

export default function AllFinance() {
  const { userinfo } = useUserInfo();
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const [selectedBranch, setSelectedBranch] = useState("all");

  const branchOptions = [
    "Uk",
    "USA",
    "Canada",
    "New Zealand",
    "Netherlands",
    "Ireland",
    "Australia",
  ];

  const {
    data: allfinances,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allfinances", user?.email, selectedBranch],
    queryFn: async () => {
      const response = await axiosBase.get(
        `/ceo/getUsers?${
          selectedBranch !== "all" ? `branch=${selectedBranch}` : ""
        }&role=finance`,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );

      console.log(response.data);
      const data = response?.data?.users || [];
      return data;
    },
  });

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedBranch(value);
    refetch();
  };

  return (
    <div>
      <div>
        {/* breadcrumbs add */}
        {/* {isLoading && <Loading />} */}
        <BreadcrumsLayout route1={userinfo?.role} activeroute2={"allfinance"} />

        {/* table */}
        <div className="bg-white px-6 py-10 mt-3 ">
          <div className="flex justify-end mb-9 ">
            <Select
              showSearch
              placeholder="Search finance by the Branch"
              optionFilterProp="label"
              className="sm:w-1/3 w-2/3 border border-gray-400 rounded-md outline-none hover:outline-none"
              onChange={onChange}
              disabled={isLoading} // Disable until data loads
              options={[
                { value: "all", label: "All Branch" },
                ...branchOptions.map((branch) => ({
                  value: branch,
                  label: branch,
                })),
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color border-b border-gray-300 ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4 text-left">Name / Email</th>
                  <th className="pb-4">Branch</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className="border-b border-gray-200">
                    <td colSpan="3" className="text-center py-4">
                      <ButtonLoading />
                    </td>
                  </tr>
                ) : (allfinances && allfinances.length <= 0) ||
                  allfinances == undefined ? (
                  <tr className="border-b border-gray-200">
                    <td colSpan="3" className="text-center py-4 text-black">
                      No finance available for this branch
                    </td>
                  </tr>
                ) : (
                  allfinances.map((finance, index) => (
                    <tr
                      key={finance?._id}
                      className="hover:bg-gray-100 border-b border-gray-200"
                    >
                      <td>{index + 1}</td>
                      <td className="text-left py-2">
                        <p className="font-semibold">
                          {finance?.firstName} {finance?.lastName}
                        </p>
                        <p>{finance?.email}</p>
                      </td>
                      <td>{finance?.branch}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          {/* <div className="flex justify-end gap-5 items-center mt-10 flex-wrap">
            <div className="flex items-center justify-end flex-wrap">
              <PaginationLayout
                prev={prev}
                next={next}
                active={active}
                setActive={setActive}
                totalPages={totalPages}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
