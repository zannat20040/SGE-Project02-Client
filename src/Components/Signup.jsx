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
import toast from "react-hot-toast";
import { CiLocationOn } from "react-icons/ci";

export default function Signup() {
  // states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPassSame, setIsPassSame] = useState(true);
  const { createWithPass, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

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
    createWithPass(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            setLoading(false);
            toast.success("Signup successful! Welcome To Shabuj Global!");
            form.reset();
            navigate("/dashboard/employee/reports");
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="">
      <div className=" card-body w-full lg:w-9/12 mx-auto text-center hidden md:flex flex-col justify-center relative ">
        {/* loading */}
        {loading && <Loading />}
        {/* login top text */}
        <div>
          <div className="flex justify-center">
            <Link to={"/"}>
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-5xl rounded-full h-15 w-15 p-3 " />
            </Link>
          </div>
          <h1 className="text-3xl my-2 mb-3 font-medium text-primary-color ">
            Join Us!
          </h1>
          <p className="text-gray-500 mb-6">
            Create your account to effortlessly manage and track your office
            expenses..
          </p>
        </div>
        <form onSubmit={HandleSignup} className="">
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
                className="hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tl  text-sm block w-full ps-10 p-2.5 text-gray-400 focus:outline-none"
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
                className="hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tr  text-sm block w-full ps-10 p-2.5 text-gray-400  border-l-0 focus:outline-none"
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
              className="hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tr  text-sm block w-full ps-10 p-2.5 text-gray-400  border-y-0 focus:outline-none"
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
              className="hover:bg-gray-100  rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-400  border h-full   "
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
                className="hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-tr  text-sm block w-full ps-10 p-2.5 text-gray-400  border-t-0 border-r-0 rounded-bl focus:outline-none"
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
                className="hover:bg-gray-100 border rounded-none outline-0 border-gray-200 rounded-br  text-sm block w-full ps-10 p-2.5 text-gray-400  border-t-0 focus:outline-none"
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
          <div className="flex mt-4 items-center  gap-2">
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
    </div>
  );
}
