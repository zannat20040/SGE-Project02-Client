import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUserInfo from "../Hooks & Context/useUserInfo";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import { useQuery } from "@tanstack/react-query";

export default function MyHistory() {
  const { user } = useContext(AuthContext);
  const { userinfo } = useUserInfo();
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [active, setActive] = useState(1);
  
console.log(user.email)
    const {
    data: ceoHistory,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["ceoHistory", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      try {
        const response = await axiosBase.get(`/expense/${user?.email}`, {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        });
        const data = response.data ;
        console.log('====>',data)
        // const reversedData = data?.slice().reverse();
        return reversedData;
      } catch (err) {
        console.error("Error fetching expenses:", err.response.data.message); // Log error
        return [];
      }
    },
  });
  
  console.log('======>',ceoHistory)

  // date filter
  const filteredData = ceoHistory?.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    return (
      (!startDate || itemDate >= fromDate) && (!endDate || itemDate <= toDate)
    );
  });

  const itemsPerPage = 10; // Show one item per page
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

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
    // <div>
    //   <div>
    //     {/* breadcrumbs add */}
    //     <BreadcrumsLayout route1={"ceo"} activeroute2={"myExpenses"} />

    //     {/* table */}
    //     <div className="bg-white px-6 py-10 mt-3">
    //       {/* table data */}

    //       <div className="overflow-x-auto mt-8 ">
    //         <table className="table table-xs text-center ">
    //           <thead>
    //             <tr className="text-primary-color  ">
    //               <th className="pb-4">#No</th>
    //               <th className="pb-4">Title</th>
    //               <th className="pb-4">Amount</th>
    //               <th className="pb-4">Status</th>
    //               <th className="pb-4">Date</th>
    //               <th className="pb-4">Recipt</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //           {paginatedData?.map((data, index) => (
    //               <tr className="hover">
    //                 <td>{index + 1}</td>
    //                 <td>{data?.expenseTitle}</td>
    //                 <td>${data?.amount}</td>
    //                 {/* status */}
    //                 <td className="">
    //                   <Chip
    //                     variant="ghost"
    //                     color={
    //                       data.status === "auto granted" ||
    //                       data.status === "granted"
    //                         ? "green"
    //                         : data.status === "rejected"
    //                         ? "red"
    //                         : "orange"
    //                     }
    //                     size="sm"
    //                     value={data?.status}
    //                     className={`font-bold text-xs  rounded  !capitalize ${
    //                       data.status === "auto granted" ||
    //                       data.status === "granted"
    //                         ? "text-green-600"
    //                         : data.status === "rejected"
    //                         ? "text-red-600"
    //                         : "text-orange-800"
    //                     } `}
    //                   />
    //                 </td>
    //                 <td>{data?.date?.split("T")[0]}</td>
    //                 {/* downlaod */}
    //                 <td>
    //                   <ButtonOutlined label={<TfiDownload />} style={"w-fit"} />
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>

    //       <div className="flex justify-end gap-5 items-center mt-10 flex-wrap">
    //         {/*pagination */}
    //         <div className="flex items-center  justify-end flex-wrap">
    //           <PaginationLayout
    //             prev={prev}
    //             next={next}
    //             active={active}
    //             setActive={setActive}
    //             totalPages={totalPages}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <p>dhbwvjwed</p>
  );
}
