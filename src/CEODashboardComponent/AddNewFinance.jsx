import React, { useContext, useState } from "react";
import { Button } from "@material-tailwind/react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import { IoPersonOutline } from "react-icons/io5";
import { GoEye, GoEyeClosed, GoMail, GoUnlock } from "react-icons/go";
import { CiLocationOn, CiWarning } from "react-icons/ci";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Loading from "../Shared Component/Loading";
import { useNavigate } from "react-router-dom";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import swal from "sweetalert";

export default function AddNewFinance() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPassSame, setIsPassSame] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosBase = useAxiosBase();
  const [loading, setLoading] = useState(false);

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

  // signup function
  const HandleNewFinanceAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const branch = form.branch.value;
    const password = form.password.value;
    const confirmpass = form.confirmpass.value;

    if (password !== confirmpass) {
      setIsPassSame(false);
      setLoading(false); 
      return; 
    }

    const financeData = {
      firstName,
      lastName,
      email,
      password,
      branch,
    };

   
    try {
      const res = await axiosBase.post("/create-finance", financeData, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      console.log(res);
      swal("Congratulations!", res.data.message, "success");
      navigate("/dashboard/ceo/allHistory");
    } catch (err) {
      swal("Ops!", err.response?.data?.message || "An error occurred", "error");
    } finally {
      setLoading(false);
      setIsPassSame(true);
    }
  };

  return (
    <div className="">
      {/* breadcrumbs add */}
      <BreadcrumsLayout route1={"ceo"} activeroute2={"addnewfinance"} />
      {loading && <Loading />}
      <form onSubmit={HandleNewFinanceAdd} className="bg-white px-6 py-12 mt-6">
        {/* name */}
        <div className="grid grid-cols-2">
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <IoPersonOutline className="text-sm  text-gray-400  " />
            </div>
            <input
              name="firstName"
              required
              type="text"
              className="bg-white hover:bg-gray-100 border rounded-none outline-0 border-gray-300 rounded-tl  text-sm block w-full ps-10 p-2.5 text-gray-800 focus:outline-none"
              placeholder="John"
            />
          </div>

          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <IoPersonOutline className="text-sm  text-gray-400  " />
            </div>
            <input
              name="lastName"
              required
              type="text"
              className=" bg-white hover:bg-gray-100 border rounded-none outline-0 border-gray-300 rounded-tr  text-sm block w-full ps-10 p-2.5 text-gray-800  border-l-0 focus:outline-none"
              placeholder="Doe"
            />
          </div>
        </div>
        {/* email */}
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <GoMail className=" text-gray-400 text-sm " />
          </div>
          <input
            name="email"
            required
            type="email"
            className="bg-white hover:bg-gray-100 border rounded-none outline-0 border-gray-300   text-sm block w-full ps-10 p-2.5 text-gray-800  border-y-0 focus:outline-none"
            placeholder="example@gmail.com"
          />
        </div>
        {/* branch */}
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <CiLocationOn className="text-gray-400" />
          </div>
          <select
            required
            name="branch"
            id="branch"
            defaultValue={""}
            className="bg-white hover:bg-gray-100  rounded-none outline-0 border-gray-300 text-sm block w-full ps-10 p-2.5 text-gray-800  border h-full   "
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
        {/* pass & confirm pass*/}
        <div className="grid grid-cols-2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <GoUnlock className=" text-gray-400 text-sm " />
            </div>
            <input
              name="password"
              required
              type={passwordVisible ? "text" : "password"}
              className="bg-white hover:bg-gray-100 border rounded-none outline-0 border-gray-300 rounded-tr  text-sm block w-full ps-10 p-2.5 text-gray-800  border-t-0 border-r-0 rounded-bl focus:outline-none"
              placeholder="••••••••"
            />
            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-0 bottom-0 my-auto"
            >
              {passwordVisible ? (
                <GoEyeClosed className="text-gray-300" />
              ) : (
                <GoEye className="text-gray-300" />
              )}
            </button>
          </div>
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <GoUnlock className=" text-gray-400 text-sm " />
            </div>
            <input
              name="confirmpass"
              required
              type={confirmPasswordVisible ? "text" : "password"}
              className="bg-white hover:bg-gray-100 border rounded-none outline-0 border-gray-300 rounded-br  text-sm block w-full ps-10 p-2.5 text-gray-800  border-t-0 focus:outline-none"
              placeholder="••••••••"
            />
            {/* Show/Hide Button */}
            <button
              type="submit"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 top-0 bottom-0 my-auto"
            >
              {confirmPasswordVisible ? (
                <GoEyeClosed className="text-gray-300" />
              ) : (
                <GoEye className="text-gray-300" />
              )}
            </button>
          </div>

          {!isPassSame && (
            <span className="text-sm text-red-600 font-medium my-1 flex gap-1 items-center">
              <CiWarning /> <span>Password didn't match</span>
            </span>
          )}
        </div>
        {/* remember checkbox  */}
        <div className="form-control mt-3 ">
          <label className="label cursor-pointer justify-start items-start gap-3 text-start ">
            <input
              required
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-xs  rounded [--chkbg:theme(colors.primary-color)] [--chkfg:white] checked:border-0"
            />
            <span className="label-text text-xs">
              By signing up, I accept the Terms and Conditions, Privacy Policy,
              and New Finance Terms
            </span>
          </label>
        </div>

        {/* button */}
        <div className="flex mt-4 items-center justify-end gap-2">
          <Button
            type="submit"
            className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-full sm:w-auto"
          >
            Create New Account
          </Button>
        </div>
      </form>
    </div>
  );
}
