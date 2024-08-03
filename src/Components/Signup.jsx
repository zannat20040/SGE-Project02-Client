import { Button } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { GoEye, GoEyeClosed, GoUnlock } from "react-icons/go";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { IoPersonOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { Link } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPassSame, setIsPassSame] = useState(true);
  const { createWithPass, loading, setLoading } = useContext(AuthContext);

  const HandleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpass = form.confirmpass.value;

    if (password !== confirmpass) {
      setIsPassSame(false);
      return;
    }

    const userdata = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      setLoading(true);
      const userCredential = await createWithPass(email, password);
      const user = userCredential.user;
      console.log(user);
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      setLoading(false);
      console.log("User created and profile updated:", user);
      // Redirect or display success message here
    } catch (error) {
      setLoading(false);
      console.error("Error during signup:", error.message);
      // Handle error here, e.g., show an alert
    }

    // form.reset();
    // console.log(userdata);
  };
  return (
    <div className="card-body w-full lg:w-9/12 mx-auto text-center hidden md:flex flex-col justify-center ">
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
      <form onSubmit={HandleSignup}>
        {/* name */}
        <div className="grid grid-cols-2">
          <label className="p-2 py-3 rounded-none rounded-tl outline-none flex items-center gap-2 hover:bg-gray-100 border">
            <IoPersonOutline className="text-2xl  text-gray-300 " />
            <input
              name="firstName"
              required
              type="text"
              className="grow text-sm  hover:bg-gray-100  outline-0"
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
              className="grow text-sm  hover:bg-gray-100  outline-0"
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
            className="grow text-sm  hover:bg-gray-100  outline-0"
            placeholder="example@gmail.com"
          />
        </label>
        {/* pass & confirm pass*/}
        <div className="grid grid-cols-2">
          <label className="relative p-2 py-3 rounded-none rounded-bl hover:bg-gray-100 flex items-center gap-2  border-t-0 border">
            <GoUnlock className=" text-gray-300" />
            <input
              name="password"
              required
              type={passwordVisible ? "text" : "password"}
              className="grow text-sm hover:bg-gray-100  outline-0"
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
              className="grow text-sm hover:bg-gray-100 outline-0"
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
