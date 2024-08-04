import React from "react";
import Breadcrumbs from "../Shared Component/Breadcrumbs";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { HiArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { TfiDownload } from "react-icons/tfi";

export default function IndividualExpensesHistory() {
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
      <div>
        {/* breadcrumbs add */}
        <Breadcrumbs
          routeLabel={"Individuals Expenses History"}
          routePath={"dashbaord / finance / history"}
        />

        {/* table */}
        <div className="bg-white px-6 py-10 mt-6 ">
          {/* table data */}
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total Expenses</th>
                  <th>Role</th>
                  <th>Expenses Statement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Member Name</td>
                  <td>memberemail@gmail.com</td>

                  <td>$500.00</td>

                  <td>Employee</td>
                  <td className="flex gap-2 justify-center">
                    <Button>
                      <TfiDownload />
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>Member Name</td>
                  <td>ceo@gmail.com</td>

                  <td>$500.00</td>

                  <td>CEO</td>
                  <td className="flex gap-2 justify-center">
                    <Button>
                      <TfiDownload />
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>Member Name</td>
                  <td>memberemail@gmail.com</td>

                  <td>$500.00</td>

                  <td>Employee</td>
                  <td className="flex gap-2 justify-center">
                    <Button>
                      <TfiDownload />
                    </Button>
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
    </div>
  );
}
