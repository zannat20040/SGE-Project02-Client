import React from "react";
import Breadcrumbs from "../Shared Component/Breadcrumbs";
import { Button, IconButton } from "@material-tailwind/react";
import { HiOutlineArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

export default function ExpenseHistory() {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div>
      {/* breadcrumbs add */}
      <Breadcrumbs
        routeLabel={"Expense History"}
        routePath={"dashbaord / employee / history"}
      />

      {/* table */}
      <div className="bg-white px-6 py-10 mt-6 ">
        {/* table data */}
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Catagory</th>
                <th>Status</th>
                <th>Date</th>
                <th>Recipt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Cy Ganderton</td>
                <td>$500.00</td>
                <td>Quality Control Specialist</td>
                <td className="bg-[#27b72734] text-green-600 font-semibold w-fit text-center rounded">
                  Added
                </td>
                <td>12/16/2020</td>
                <td>
                  <Button>Download</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Hart Hagerty</td>
                <td>$750.00</td>
                <td>Desktop Support Technician</td>
                <td className="bg-[#27b72734] text-green-600 font-semibold w-fit text-center rounded">
                  Added
                </td>
                <td>12/5/2020</td>
                <td>
                  <Button>Download</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Brice Swyre</td>
                <td>$300.00</td>
                <td>Tax Accountant</td>
                <td className="bg-[#b7312734] text-red-600 font-semibold w-fit text-center rounded">
                  Pending
                </td>
                <td>8/15/2020</td>
                <td>
                  <Button>Download</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-9">
          <Button>Download All History</Button>

          {/* pagination */}
          <div className="flex items-center gap-4">
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={prev}
              disabled={active === 1}
            >
              <HiOutlineArrowLongLeft strokeWidth={2} className="h-4 w-4" />{" "}
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton {...getItemProps(1)}>1</IconButton>
              <IconButton {...getItemProps(2)}>2</IconButton>
              <IconButton {...getItemProps(3)}>3</IconButton>
              <IconButton {...getItemProps(4)}>4</IconButton>
              <IconButton {...getItemProps(5)}>5</IconButton>
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={next}
              disabled={active === 5}
            >
              Next
              <HiArrowLongRight strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
