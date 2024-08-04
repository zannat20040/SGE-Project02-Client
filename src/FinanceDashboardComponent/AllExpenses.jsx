import React from "react";
import Breadcrumbs from "../Shared Component/Breadcrumbs";
import { Button, IconButton } from "@material-tailwind/react";
import { HiArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { CiStickyNote } from "react-icons/ci";

export default function AllExpenses() {
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
          routeLabel={"All Expenses History"}
          routePath={"dashbaord / finance / allexpenses"}
        />

        {/* table */}
        <div className="bg-white px-6 py-10 mt-6 ">
          {/* table data */}
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Details</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Catagory</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Note/Recipt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <p>Member Name</p>
                    <p>memberemail@gmail.com</p>
                  </td>
                  <td>Cy Ganderton</td>
                  <td>$500.00</td>
                  <td>Catagory</td>
                  <td className="text-center">
                    <form className="input input-sm  rounded flex justify-between p-0  items-center focus:outline-0  outline-none text-gray-700  bg-white  border border-gray-300">
                      <select
                        required
                        className="w-full border-gray-200 rounded bg-white focus:outline-0"
                        name="status"
                      >
                        <option value="" selected>
                          Pending
                        </option>
                        <option value="">Added</option>
                      </select>
                      <button
                        type="button"
                        className="btn btn-sm rounded  bg-customPurple text-white"
                      >
                        <FaCheck className="text-xs" />
                      </button>
                    </form>
                  </td>
                  <td>Employee</td>
                  <td>12/16/2020</td>
                  <td className="flex gap-2 justify-center">
                    <Button>
                      <CiStickyNote />
                    </Button>
                    <Button>
                      <TfiDownload />
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>
                    <p>Member Name</p>
                    <p>memberemail@gmail.com</p>
                  </td>
                  <td>Cy Ganderton</td>
                  <td>$500.00</td>
                  <td>Catagory</td>
                  <td className=" bg-[#27b72734] text-green-600 font-semibold w-fit text-center rounded">
                    Added
                  </td>
                  <td>CEO</td>
                  <td>12/16/2020</td>
                  <td className="flex gap-2 justify-center">
                    <Button>
                      <CiStickyNote />
                    </Button>
                    <Button>
                      <TfiDownload />
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>
                    <p>Member Name</p>
                    <p>memberemail@gmail.com</p>
                  </td>
                  <td>Cy Ganderton</td>
                  <td>$500.00</td>
                  <td>Catagory</td>
                  <td className="bg-[#27b72734] text-green-600 font-semibold w-fit text-center rounded">
                    Added
                  </td>
                  <td>Employee</td>
                  <td>12/16/2020</td>
                  <td className="flex gap-2 justify-center">
                    <Button>
                      <CiStickyNote />
                    </Button>
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
