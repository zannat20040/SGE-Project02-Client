import React from "react";
import { Button, Chip, IconButton } from "@material-tailwind/react";
import { HiOutlineArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { TfiDownload } from "react-icons/tfi";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import PrimaryButton from "../Shared Component/PrimaryButton";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import PaginationLayout from "../Shared Component/PaginationLayout";

export default function ExpenseHistory() {
  // object
  const tableData = [
    {
      id: 1,
      name: "Cy Ganderton",
      amount: "$500.00",
      position: "Quality Control Specialist",
      status: "Added",
      date: "12/16/2020",
    },
    {
      id: 2,
      name: "Hart Hagerty",
      amount: "$750.00",
      position: "Desktop Support Technician",
      status: "Decline",
      date: "12/5/2020",
    },
    {
      id: 3,
      name: "Brice Swyre",
      amount: "$300.00",
      position: "Tax Accountant",
      status: "Pending",
      date: "8/15/2020",
    },
  ];

  // pagination start from here
  const [active, setActive] = React.useState(1);
  const itemsPerPage = 1; // Show one item per page
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Calculate paginated data
  const paginatedData = tableData.slice(
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
      {/* breadcrumbs add */}
      <BreadcrumsLayout route1={"employee"} activeroute2={"history"} />

      {/* table */}
      <div className="bg-white px-6 py-10 mt-6 ">
        {/* table data */}
        <div className="overflow-x-auto">
          <table className="table table-xs text-center ">
            <thead>
              <tr className="text-primary-color  ">
                <th className="pb-4">No.</th>
                <th className="pb-4">Title</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Catagory</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Recipt</th>
              </tr>
            </thead>
            <tbody>
              {/* tr-1 */}
              {paginatedData?.map((data) => (
                <tr className="hover">
                  <td>{data?.id}</td>
                  <td>{data?.name}</td>
                  <td>{data?.amount}</td>
                  <td>{data?.position}</td>
                  {/* status */}
                  <td className="">
                    <Chip
                      variant="ghost"
                      color={
                        data.status === "Added"
                          ? "green"
                          : data.status === "Decline"
                          ? "red"
                          : "orange"
                      }
                      size="sm"
                      value={data?.status}
                      className={`font-bold text-xs  rounded  !capitalize ${
                        data.status === "Added"
                          ? "text-green-600"
                          : data.status === "Decline"
                          ? "text-red-600"
                          : "text-orange-800"
                      } `}
                    />
                  </td>
                  <td>{data?.date}</td>
                  {/* downlaod */}
                  <td>
                    <ButtonOutlined label={<TfiDownload />} style={"w-fit"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex items-center mt-10 justify-end">
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
  );
}
