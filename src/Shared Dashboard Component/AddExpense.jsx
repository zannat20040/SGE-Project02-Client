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
import toast from "react-hot-toast";

export default function AddExpense() {
  const { user } = useContext(AuthContext);
  const [showName, setShowName] = useState();
  const [loading, setLoading] = useState(false);
  const [enableTitle, setEnableTitle] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [isLessThanFifty, setIsLessThanFifty] = useState(false);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const axiosBase = useAxiosBase();
  const navigate = useNavigate();
  const { userinfo } = useUserInfo();
  const { refetchBudget, remainingBalance } = useGetExpenseContext(); // expense data fetch

  // Select category options
  const categoryoptions = [
    "Office Supplies",
    "Client-Related Expenses",
    "Professional Development",
    "Communication",
    "Meals and Entertainment",
    "Miscellaneous",
    "Remote Work Expenses",
    "Health and Safety",
    "Transportation and Parking",
    "Marketing and Advertising",
    "Salary",
  ];

  // Category selection and handling title enabling for 'Others'
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

  const HandleTitleLength = (e) => {
    const value = e.target.value;
    setExpenseTitle(value);
    setIsLessThanFifty(value.length > 50);
  };

  // Expense adding logic
  const HandleExpenseAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const date = e.target.date.value;
    const amount = parseFloat(e.target.amount.value); 

    const remainingBudget = remainingBalance;

    // Check if amount exceeds remaining balance
    if (amount > remainingBudget) {
      setLoading(false);
      toast.error("Expense Amount exceeds your remaining budget!");
      return;
    }
    if (amount <=0 ) {
      setLoading(false);
      toast.error("Expense Amount can not be zero!");
      return;
    }

    const formData = new FormData();
    if (showName) {
      formData.append("receipt", showName[0]); // Single file
    }

    formData.append(
      "expenseTitle",
      category === "Others" ? expenseTitle : category
    );
    formData.append("amount", amount.toFixed(2));
    formData.append("role", userinfo?.role);
    formData.append("branch", userinfo?.branch);
    formData.append("date", date);
    formData.append("notes", notes);
    formData.append("username", user?.displayName ? user?.displayName : "CEO");

    const dataObject = {};
    formData.forEach((value, key) => {
      dataObject[key] = value; // Show file name or value
    });

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
      refetchBudget();
      e.target.reset();
      setShowName(null); // Reset file upload
      navigate(
        userinfo?.role === "employee"
          ? "/dashboard/employee/history"
          : "/dashboard/ceo/allHistory"
      );
    } catch (err) {
      console.error(err);
      swal("Oops!", err.response?.data?.error || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* breadcrumbs add */}
      {loading && <Loading />}
      <BreadcrumsLayout route1={userinfo?.role} activeroute2={"addexpense"} />

      {/* FORM */}
      <form
        onSubmit={HandleExpenseAdd}
        className="bg-white px-10 py-10 mt-4"
        action="/upload"
        method="POST"
        enctype="multipart/form-data"
      >
        <h1 className="md:text-lg text-base font-semibold capitalize mb-4 text-primary-color tracking-wider">
          Share your Expense details
        </h1>

        {/* length checking label */}
        <label className="mt-3 mb-2 flex md:hidden text-red-700 -top-5 duration-150 text-xs">
          {isLessThanFifty &&
            category === "Others" &&
            "Purpose should be less than 50 characters"}
        </label>

        <div className="rounded-md border border-gray-200">
          {/* title & amount */}
          <div className="grid grid-cols-2">
            {/* CATEGORY */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <BiCategory className="text-gray-400" />
              </div>
              <select
                required
                onChange={HandleCategory}
                name="category"
                value={category}
                className="bg-white h-full hover:bg-gray-100 border-b rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-[11px] text-gray-800 border-r-0 focus:outline-none"
              >
                <option disabled value="">
                  Choose your expense category
                </option>
                {categoryoptions.map((option, i) => (
                  <option key={i} className="text-black">
                    {option}
                  </option>
                ))}
                <option className="text-black">Others</option>
              </select>
            </div>

            {/* PURPOSE */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <PiSubtitlesThin className="text-gray-400" />
              </div>
              <label className="absolute md:flex hidden text-red-700 -top-5 duration-150 text-xs">
                {isLessThanFifty &&
                  category === "Others" &&
                  "Purpose should be less than 50 characters"}
              </label>
              <input
                required
                disabled={!enableTitle}
                onChange={HandleTitleLength}
                name="purpose"
                value={expenseTitle}
                placeholder={
                  enableTitle
                    ? "Write your expense purpose"
                    : "Select Others from category to write here"
                }
                type="text"
                className={`bg-white focus:outline-none hover:bg-gray-100 border-b rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800 ${
                  isLessThanFifty && category === "Others" && "border-red-700"
                }`}
              />
            </div>
          </div>

          {/* amount, date, branch */}
          <div className="grid sm:grid-cols-3 grid-cols-1">
            {/* AMOUNT */}
            <div className="relative sm:col-span-3 md:col-span-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MdAttachMoney className="text-gray-400" />
              </div>
              <input
                name="amount"
                // value={amount}
                // onChange={(e) => setAmount(e.target.value)}
                required
                type="text"
                className="bg-white hover:bg-gray-100 rounded-none outline-none border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800 border-r  h-full "
                placeholder="Expense Amount"
              />
            </div>

            {/* DATE */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiCalendarDate className="text-gray-400" />
              </div>

              <input
                name="date"
                value={new Date().toISOString().split("T")[0]}
                disabled
                className="bg-white hover:bg-gray-100 rounded-none !outline-none border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800 border-r"
              />
            </div>

            {/* BRANCH */}
            <div className="relative sm:col-span-2 md:col-span-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiLocationOn className="text-gray-400" />
              </div>
              <input
                disabled
                name="branch"
                value={userinfo?.branch}
                className="bg-white capitalize hover:bg-gray-100 rounded-none outline-0 text-sm block w-full ps-10 p-2.5 text-gray-800 h-full"
                placeholder="Expense Branch"
              />
            </div>
          </div>

          {/* NOTES */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center ps-3.5 pointer-events-none">
              <PiSubtitlesThin className="text-gray-400" />
            </div>
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white hover:bg-gray-100 border-t outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800 focus:outline-none rounded-none h-full "
              placeholder="Write your additional notes...(optional)"
            />
          </div>
        </div>

        <h1 className="md:text-lg text-base font-semibold capitalize my-4 text-primary-color tracking-wider">
          Share your Expense Documents
        </h1>

        {/* FILE UPLOAD */}
        <FileUpload setShowName={setShowName} showName={showName} />

        {/* submit button */}
        <div className="mt-5 flex justify-end">
          <Button
            disabled={isLessThanFifty}
            type="submit"
            className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none sm:w-fit w-full`}
          >
            Add this
          </Button>
        </div>
      </form>
    </div>
  );
}
