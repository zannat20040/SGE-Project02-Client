import { Button } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { GoEye, GoEyeClosed, GoUnlock } from "react-icons/go";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { IoPersonOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Loading from "../Shared Component/Loading";
import { CiLocationOn } from "react-icons/ci";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import swal from "sweetalert";

export default function Signup() {
  // states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPassSame, setIsPassSame] = useState(true);
  const { createWithPass, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosBase = useAxiosBase();

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
  const HandleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const branch = form.branch.value;
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
      branch,
      role: "employee",
    };

    //  firebase function call
    try {
      setLoading(true);
      const userCredential = await createWithPass(email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      const response = await axiosBase.post("/signup", userData);
      swal("Great!", response.data.message, "success");
      form.reset();
      navigate("/dashboard/reports");
    } catch (error) {
      console.error("Signup error:", error);
      swal("Ops!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="" id="signup">
      <div className=" card-body w-11/12 mx-auto text-center relative ">
        {/* loading */}
        {loading && <Loading />}
        {/* login top text */}
        <div className="">
          <div className="flex justify-center">
            <Link to={"/"}>
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-5xl rounded-full h-15 w-15 p-3 " />
            </Link>
          </div>
          <h1 className="md:text-2xl text-xl my-2 mb-3 font-medium text-primary-color ">
            Join Us!
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            Create your account to effortlessly manage and track your office
            expenses..
          </p>
        </div>
        <form onSubmit={HandleSignup} className="">
          <div className="border  rounded border-gray-200 ">
            {/* name */}
            <div className="grid grid-cols-2">
              <div className="relative ">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none   ">
                  <IoPersonOutline className="text-sm  text-gray-400  " />
                </div>
                <input
                  name="firstName"
                  required
                  type="text"
                  className="bg-white  border-r outline-0 h-full border-gray-200  text-sm block w-full ps-10 p-2.5 text-gray-800 focus:outline-none"
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
                  className="   outline-0text-sm block w-full ps-10 p-2.5 text-gray-800  border-l-0 focus:outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>
            {/* email */}
            <div className="relative ">
              <div
                className="absolute border-y 
                border-gray-200  inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
              >
                <GoMail className=" text-gray-400 text-sm " />
              </div>
              <input
                name="email"
                required
                type="email"
                className=" bg-white  outline-0 border-y 
                  border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800  focus:outline-none"
                placeholder="example@gmail.com"
              />
            </div>
            {/* branch */}
            <div className="relative ">
              <div className=" absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none border-b border-gray-200">
                <CiLocationOn className="text-gray-400" />
              </div>
              <select
                required
                name="branch"
                id="branch"
                defaultValue={""}
                className="bg-white   rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800  border-b h-full   "
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
                <div className="absolute   inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <GoUnlock className=" text-gray-400 text-sm " />
                </div>
                <input
                  name="password"
                  required
                  type={passwordVisible ? "text" : "password"}
                  className="  bg-white  rounded-none outline-0   text-sm block w-full ps-10 p-2.5 text-gray-800 focus:outline-none"
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
                  <GoUnlock className=" text-gray-400 text-sm  " />
                </div>
                <input
                  name="confirmpass"
                  required
                  type={confirmPasswordVisible ? "text" : "password"}
                  className=" rounded-none outline-0   text-sm block w-full ps-10 p-2.5 text-gray-800   focus:outline-none bg-white "
                  placeholder="••••••••"
                />
                {/* Show/Hide Button */}
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
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
                <span className="text-sm text-primary-color font-medium my-1 flex gap-1 items-center">
                  <CiWarning /> <span>Password didn't match</span>
                </span>
              )}
            </div>
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
                By signing up, I accept the Terms and Conditions and Privacy
                Policy.
              </span>
            </label>
          </div>

          {/* button */}
          <div className="flex mt-4 items-center  gap-2 md:flex-row flex-col">
            <Button
              type="submit"
              className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-full md:w-fit"
            >
              Create New Account
            </Button>
            <Link to={"/"} className="w-full md:w-fit">
              <ButtonOutlined label={"Login Now"} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
