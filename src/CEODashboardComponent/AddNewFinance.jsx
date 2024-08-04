import React, { useContext, useState } from "react";
import { Button } from "@material-tailwind/react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import { IoPersonOutline } from "react-icons/io5";
import { GoEye, GoEyeClosed, GoMail, GoUnlock } from "react-icons/go";
import { CiLocationOn, CiWarning } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function AddNewFinance() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPassSame, setIsPassSame] = useState(true);
  const { createWithPass, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // select branch option
  const options = [
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

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const branchName = form.branch.value;
    const password = form.password.value;
    const confirmpass = form.confirmpass.value;

    if (password !== confirmpass) {
      setIsPassSame(false);
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      branchName,
    };

    // firebase function call
    // createWithPass(email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     updateProfile(user, {
    //       displayName: `${firstName} ${lastName}`,
    //     })
    //       .then(() => {
    //         setLoading(false);
    //         toast.success("Signup successful! Welcome To Shabuj Global!");
    //         form.reset();
    //         navigate("/dashboard/employee/reports");
    //       })
    //       .catch((error) => {
    //         setLoading(false);
    //         toast.error(error.message);
    //       });
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     toast.error(error.message);
    //   });
  };

  return (
    <div className="">
      {/* breadcrumbs add */}
      <BreadcrumsLayout route1={"ceo"} activeroute2={"addnewfinance"} />

      <form onSubmit={HandleNewFinanceAdd} className="bg-white px-6 py-12 mt-6">
        {/* name */}
        <div className="grid grid-cols-2">
          <label className="p-2 py-3 rounded-none rounded-tl outline-none flex items-center gap-2 hover:bg-gray-100 border">
            <IoPersonOutline className="text-2xl  text-gray-300  " />
            <input
              name="firstName"
              required
              type="text"
              className="grow text-sm  hover:bg-gray-100  outline-0 text-gray-400"
              placeholder="John"
              o
            />
          </label>
          <label className="p-2 py-3 rounded-tr rounded-none outline-none flex items-center gap-2 hover:bg-gray-100 border border-l-0">
            <IoPersonOutline className="text-2xl  text-gray-300 " />
            <input
              name="lastName"
              required
              type="text"
              className="grow text-sm  hover:bg-gray-100  outline-0 text-gray-400"
              placeholder="Doe"
            />
          </label>
        </div>
        {/* email */}
        <label className="p-2 py-3 rounded-none outline-none flex items-center gap-2 hover:bg-gray-100 border border-t-0">
          <GoMail className=" text-gray-300 " />
          <input
            name="email"
            required
            type="email"
            className="grow text-sm  hover:bg-gray-100  outline-0 text-gray-400"
            placeholder="example@gmail.com"
          />
        </label>
        {/* branch */}
        <label className="w-full p-2 py-3 rounded-none outline-none flex items-center gap-2 hover:bg-gray-100 border border-t-0">
          <CiLocationOn className=" text-gray-300 " />
          <select
            name="branch"
            required
            className="grow text-sm hover:bg-gray-100  outline-0 text-gray-400 focus:bg-transparent"
          >
            <option disabled selected>
              Select your branch
            </option>

            {options?.map((option, index) => (
              <option key={index} className="text-black">
                {option}
              </option>
            ))}
          </select>
        </label>
        {/* pass & confirm pass*/}
        <div className="grid grid-cols-2">
          <label className="relative p-2 py-3 rounded-none rounded-bl hover:bg-gray-100 flex items-center gap-2  border-t-0 border">
            <GoUnlock className=" text-gray-300" />
            <input
              name="password"
              required
              type={passwordVisible ? "text" : "password"}
              className="grow text-sm hover:bg-gray-100  outline-0 focus:bg-transparent text-gray-400"
              placeholder="••••••••"
            />
            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3"
            >
              {passwordVisible ? (
                <GoEyeClosed className="text-gray-300" />
              ) : (
                <GoEye className="text-gray-300" />
              )}
            </button>
          </label>
          <label className="relative p-2 py-3 rounded-none rounded-br  hover:bg-gray-100 flex items-center gap-2  border-t-0 border-l-0 border">
            <GoUnlock className=" text-gray-300" />
            <input
              name="confirmpass"
              required
              type={confirmPasswordVisible ? "text" : "password"}
              className="grow text-sm hover:bg-gray-100 outline-0 text-gray-400"
              placeholder="••••••••"
            />
            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 group"
            >
              {passwordVisible ? (
                <GoEyeClosed className="text-gray-300 " />
              ) : (
                <GoEye className="text-gray-300" />
              )}
            </button>
          </label>
          {!isPassSame && (
            <span className="text-sm text-primary-color font-medium my-1 flex gap-1 items-center">
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
              className="checkbox checkbox-sm  rounded [--chkbg:theme(colors.primary-color)] [--chkfg:white] checked:border-0"
            />
            <span className="label-text text-sm">
              By signing up, I accept the Terms and Conditions and Privacy
              Policy.
            </span>
          </label>
        </div>

        {/* button */}
        <div className="flex mt-4 items-center gap-2">
          <Button
            type="submit"
            className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none"
          >
            Create New Account
          </Button>
          <Link to={"/"}>
            <ButtonOutlined label={"Login Now"} />
          </Link>
        </div>
      </form>
    </div>
  );
}
