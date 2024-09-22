import React, { useContext } from "react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useUserInfo from "../Hooks & Context/useUserInfo";
import ButtonLoading from "../Shared Component/ButtonLoading";
import PaginationLayout from "../Shared Component/PaginationLayout";
import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function AllFinance() {
  const { userinfo } = useUserInfo();
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const { data: allfinances, isLoading } = useQuery({
    queryKey: ["allfinances", user?.email],
    queryFn: async () => {
      const response = await axiosBase.get(`/ceo/getUsers?role=${"finance"}`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      console.log(response.data);
      const data = response?.data?.users || [];

      return data;
    },
  });

  return (
    <div>
      <div>
        {/* breadcrumbs add */}
        <BreadcrumsLayout route1={userinfo?.role} activeroute2={"allfinance"} />

        {/* table */}
        <div className="bg-white px-6 py-10 mt-3 ">

            
          <div className="overflow-x-auto  ">
            <table className="table table-xs text-center ">
              <thead>
                <tr className="text-primary-color border-b border-gray-300 ">
                  <th className="pb-4">No.</th>
                  <th className="pb-4 text-left">Name / Email</th>
                  <th className="pb-4">Branch</th>
                </tr>
              </thead>
              <tbody>
                {allfinances?.map((finance, index) => (
                  <tr key={finance?._id} className="hover:bg-gray-100 border-b border-gray-200">
                    <td>{index+1}</td>
                    <td className="text-left py-2">
                        <p className="font-semibold">{finance?.firstName} {finance?.lastName}</p>
                        <p>{finance?.email}</p>
                    </td>
                    <td>
                        {finance?.branch}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          {/* <div className="flex justify-end gap-5 items-center mt-10 flex-wrap">
            <div className="flex items-center  justify-end flex-wrap">
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
