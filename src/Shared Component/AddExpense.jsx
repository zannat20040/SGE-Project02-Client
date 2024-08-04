import React, { useState } from "react";
import FileUpload from "./FileUpload";
import BreadcrumsLayout from "./BreadcrumsLayout";
import PrimaryButton from "./PrimaryButton";
import { PiSubtitlesThin } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import Loading from "./Loading";

export default function AddExpense() {
  const [showName, setShowName] = useState({});
  const [loading, setLoading] = useState(false);

  // select category option
  const categoryoptions = [
    "Office Supplies",
    "Client-Related Expenses",
    "Professional Development",
    "Communication",
    "Meals and Entertainment",
    "Meals and Entertainment",
    "Miscellaneous",
    "Remote Work Expenses",
    "Health and Safety",
    "Transportation and Parking",
    "Marketing and Advertising",
  ];

  // select branch option
  const branchoptions = [
    "Uk",
    "USA",
    "Canada",
    "New Zealand",
    "Netherlands",
    "Ireland",
    "Australia",
  ];

  const HandleExpenseAdd = (e) => {
    e.preventDefault();

    const form = e.target;
    const purpose = form.purpose.value;
    const amount = form.amount.value;
    const category = form.category.value;
    const branch = form.branch.value;
    const date = form.date.value;
    const expenseCategory = form.expenseCategory.value;
    const notes = form.notes.value;
    const recipt = showName.name ? showName.name : null;

    const expenseData = {
      purpose,
      recipt,
      amount,
      branch,
      category,
      date,
      expenseCategory,
      notes,
    };
    console.log(expenseData);
  };

  return (
    <div className="">
      {/* breadcrumbs add */}
      {loading && <Loading />}
      <BreadcrumsLayout route1={"employee"} activeroute2={"addexpense"} />

      {/* FORM */}
      <form onSubmit={HandleExpenseAdd} className="bg-white px-10 py-10 mt-4 ">
        <h1 className="text-lg font-semibold capitalize mb-4 text-primary-color tracking-wider">
          Share you Expense details
        </h1>
        {/* title & amount */}
        <div className="grid grid-cols-2 ">
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <PiSubtitlesThin className="text-gray-400" />
            </div>
            <input
              required
              name="purpose"
              type="text"
              id="input-group-1"
              className="hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tl  text-sm block w-full ps-10 p-2.5 text-gray-400  border-r-0 focus:outline-none"
              placeholder="Expense Purpose"
            />
          </div>
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdAttachMoney className="text-gray-400" />
            </div>
            <input
              name="amount"
              required
              type="number"
              id="input-group-1"
              className="focus:outline-none hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tr  text-sm block w-full ps-10 p-2.5 text-gray-400 "
              placeholder="Expense Amouny"
            />
          </div>
        </div>
        {/* category,date,branch */}
        <div className="grid grid-cols-3">
          {/* CATEGORY  */}
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <BiCategory className="text-gray-400" />
            </div>
            <select
              name="expenseCategory"
              id="category"
              defaultValue={"Others"}
              className="hover:bg-gray-100  rounded-none outline-0 border-gray-200   text-sm block w-full ps-10 p-2.5 text-gray-400  border-l h-full  "
            >
              <option disabled>Choose a your expense category</option>
              {categoryoptions?.map((option, i) => (
                <option key={i} className="text-black">
                  {option}
                </option>
              ))}
              <option>Others</option>
            </select>
          </div>
          {/* DATE */}
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <CiCalendarDate className="text-gray-400" />
            </div>
            <input
              required
              name="date"
              id="default-datepicker"
              type="date"
              className="hover:bg-gray-100  rounded-none outline-0 border-gray-200  text-sm block w-full ps-10 p-2.5 text-gray-400  border-l"
              placeholder="Select expense date"
            />
          </div>
          {/* BRANCH */}
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <BiCategory className="text-gray-400" />
            </div>
            <select
              required
              name="branch"
              id="branch"
              defaultValue={""}
              className="hover:bg-gray-100  rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-400  border-x h-full   "
            >
              <option value="" disabled>
                Select your branch
              </option>
              {branchoptions?.map((option, i) => (
                <option key={i} className="text-black ">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* NOTES */}
        <div className="relative ">
          <div className="absolute inset-0 flex items-center ps-3.5 pointer-events-none">
            <PiSubtitlesThin className="text-gray-400" />
          </div>
          <textarea
            name="notes"
            type="text"
            id="input-group-1"
            className="hover:bg-gray-100 border  outline-0 border-gray-200   text-sm block w-full ps-10 p-2.5 text-gray-400   focus:outline-none rounded-none h-full rounded-b  "
            placeholder="Write here your aditional notes...(optional)"
          />
        </div>

        <h1 className="text-lg font-semibold capitalize my-4 text-primary-color tracking-wider">
          Share you Expense Documents
        </h1>
        {/* FILE UPLOAD */}
        <FileUpload setShowName={setShowName} showName={showName} />
        {/* submit button */}
        <div className="mt-5 flex justify-end">
          <PrimaryButton label={"Add this"} />
        </div>
      </form>
    </div>
  );
}
