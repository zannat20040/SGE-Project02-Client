import React, { useContext, useState } from "react";
import FileUpload from "../Shared Component/FileUpload";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import { PiSubtitlesThin } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import Loading from "../Shared Component/Loading";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { useGetExpenseContext } from "../Hooks & Context/ExpenseContext";
import successSound from "../assets/WhatsApp Audio 2024-08-03 at 18.45.20_2a165e76.mp3";
import useUserInfo from "../Hooks & Context/useUserInfo";
import swal from "sweetalert";

export default function AddExpense() {
  const { user } = useContext(AuthContext);
  const [showName, setShowName] = useState({});
  const [loading, setLoading] = useState(false);
  const [enableTitle, setEnableTitle] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [isLessThanFifty, setIsLessThanFifty] = useState(false);
  const [category, setCategory] = useState("");
  const axiosBase = useAxiosBase();
  const navigate = useNavigate();
  const { userinfo } = useUserInfo();
  const { refetch } = useGetExpenseContext(); //expense data fetch

  console.log(showName);

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
    "Salary",
  ];

  // category as title change
  const HandleCategory = (e) => {
    const value = e.target.value;
    if (value === "Others") {
      setEnableTitle(true);
      setExpenseTitle("");
      setCategory(value);
    } else {
      setEnableTitle(false);
      setExpenseTitle(value);
      setCategory(value);
    }
  };

  // title length check
  const HandleTitleLength = (e) => {
    const value = e.target.value;
    if (value.length > 50) {
      setIsLessThanFifty(true);
    } else {
      setIsLessThanFifty(false);
    }
  };

  // expense added function
  const HandleExpenseAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const purpose = form.purpose.value;
    const amount = form.amount.value;
    const category = form.category.value;
    const date = form.date.value;
    const notes = form.notes.value;
    const receipt = showName.name ? showName.name : null;
    console.log(receipt);

    const currentExpenseTitle = category === "Others" ? purpose : category;

    const expenseData = {
      expenseTitle: currentExpenseTitle,
      receipt,
      amount,
      role: userinfo?.role,
      branch: userinfo?.branch,
      date,
      notes,
      username: user?.displayName,
    };

    // console.log(expenseData);

    const formData = new FormData();
    formData.append("receipt", showName);
    formData.append("expenseTitle", currentExpenseTitle);
    formData.append("amount", amount);
    formData.append("role", userinfo?.role);
    formData.append("branch", userinfo?.branch);
    formData.append("date", date);
    formData.append("notes", notes);
    formData.append("username", user?.displayName);

    try {
      const res = await axiosBase.post("/expense", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.email}`,
        },
      });

      const audio = new Audio(successSound);
      swal("Great!", res.data.message, "success");
      audio.play();
      refetch();
      form.reset();
      setShowName({});
      navigate(
        userinfo?.role === "employee"
          ? "/dashboard/employee/history"
          : "/dashboard/ceo/allHistory"
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
      swal("Great!", err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="">
      {/* breadcrumbs add */}
      {loading && <Loading />}
      <BreadcrumsLayout route1={userinfo?.role} activeroute2={"addexpense"} />

      {/* FORM */}
      <form
        onSubmit={HandleExpenseAdd}
        className="bg-white px-10 py-10 mt-4 "
        encType="multipart/form-data"
      >
        <h1 className="md:text-lg text-base font-semibold capitalize mb-4 text-primary-color tracking-wider">
          Share you Expense details
        </h1>

        {/* length checking label */}
        <label className=" mt-3 mb-2 flex md:hidden text-red-700 -top-5 duration-150 text-xs">
          {isLessThanFifty &&
            category === "Others" &&
            "Purpose should be less then 50 character"}
        </label>
        {/* title & amount */}
        <div className="grid grid-cols-2 ">
          {/* CATEGORY  */}

          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <BiCategory className="text-gray-400" />
            </div>
            <select
              required
              onChange={HandleCategory}
              name="expenseCategory"
              id="category"
              defaultValue={""}
              className="hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tl  text-sm block w-full ps-10 p-[11px] text-gray-800  border-r-0 focus:outline-none"
            >
              <option disabled value={""}>
                Choose a your expense category
              </option>
              {categoryoptions?.map((option, i) => (
                <option key={i} className="text-black">
                  {option}
                </option>
              ))}
              <option className="text-black">Others</option>
            </select>
          </div>
          {/* PURPOSE */}
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <PiSubtitlesThin className="text-gray-400" />
            </div>
            <label className="absolute md:flex hidden text-red-700 -top-5 duration-150 text-xs">
              {isLessThanFifty &&
                category === "Others" &&
                "Purpose should be less then 50 character"}
            </label>
            <input
              disabled={!enableTitle}
              onChange={HandleTitleLength}
              required
              name="purpose"
              placeholder={
                enableTitle
                  ? "Write your expense purpose"
                  : "Select Others from category to write here"
              }
              type="text"
              id="input-group-1"
              className={`focus:outline-none hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tr  text-sm block w-full ps-10 p-2.5 text-gray-800 ${
                isLessThanFifty && category === "Others" && "border-red-700"
              }`}
            />
          </div>
        </div>
        {/* amount,date,branch */}
        <div className="grid sm:grid-cols-3 grid-cols-1">
          {/* AMOUNT */}
          <div className="relative sm:col-span-3 md:col-span-1 ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdAttachMoney className="text-gray-400" />
            </div>
            <input
              name="amount"
              required
              type="text"
              id="input-group-1"
              className="hover:bg-gray-100  rounded-none  outline-0 border-gray-200   text-sm block w-full ps-10 p-2.5 text-gray-800  border-l h-full  md:border-r-0 border-r border-b md:border-b-0 "
              placeholder="Expense Amount"
            />
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
              className="hover:bg-gray-100  rounded-none outline-0 border-gray-200  text-sm block w-full ps-10 p-2.5 text-gray-800  border-l sm:border-r-0  border-r border-b sm:border-b-0"
              placeholder="Select expense date"
            />
          </div>
          {/* BRANCH */}
          <div className="relative sm:col-span-2 md:col-span-1 ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <CiLocationOn className="text-gray-400" />
            </div>
            <input
              disabled
              name="branch"
              required
              type="text"
              id="input-group-1"
              value={userinfo?.branch}
              className="capitalize hover:bg-gray-100  rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800  border-x h-full   "
              placeholder="Expense Amouny"
            />
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
            className="hover:bg-gray-100 border  outline-0 border-gray-200   text-sm block w-full ps-10 p-2.5 text-gray-800   focus:outline-none rounded-none h-full rounded-b   "
            placeholder="Write here your aditional notes...(optional)"
          />
        </div>

        <h1 className="md:text-lg text-base font-semibold capitalize my-4 text-primary-color tracking-wider">
          Share you Expense Documents
        </h1>
        {/* FILE UPLOAD */}
        <FileUpload setShowName={setShowName} showName={showName} />
        {/* submit button */}
        <div className="mt-5 flex justify-end">
          <Button
            disabled={isLessThanFifty}
            type="submit"
            className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none  sm:w-fit w-full`}
          >
            Add this
          </Button>
        </div>
      </form>
    </div>
  );
}
