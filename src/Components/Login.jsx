import React, { useContext, useState } from "react";
import { GoEye, GoEyeClosed, GoMail, GoUnlock } from "react-icons/go";
import { Button } from "@material-tailwind/react";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../Shared Component/Loading";

export default function Login() {
  // states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginWithPass, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // login function
  const HandleSignin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const userdata = {
      email,
      password,
    };

    try {
      await loginWithPass(email, password);
      form.reset();
      toast.success("Login successful");
      setLoading(false);
      navigate("/dashboard/employee/reports");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className={`card-body w-full hidden lg:w-9/12 mx-auto text-center  md:flex flex-col justify-center `}
      >
        {loading && <Loading />}
        {/* login top text */}
        <div>
          <div className="flex justify-center">
            <Link to={"/"}>
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-5xl rounded-full h-15 w-15 p-3 " />
            </Link>
          </div>
          <h1 className="text-3xl my-2 mb-3 font-medium text-primary-color ">
            Hello Again!
          </h1>
          <p className="text-gray-500 mb-6">
            It’s time to dive back into your journey. Enter your details to
            continue.
          </p>
        </div>
        <form onSubmit={HandleSignin}>
          {/* email */}
          <label className="p-2 py-3 rounded rounded-b-none outline-none flex items-center gap-2 hover:bg-gray-100 border">
            <GoMail className=" text-gray-300 " />

            <input
              name="email"
              required
              type="email"
              className="grow text-sm  hover:bg-gray-100  outline-0"
              placeholder="example@gmail.com"
            />
          </label>
          {/* pass */}
          <label className="relative p-2 py-3 rounded-t-none rounded hover:bg-gray-100 flex items-center gap-2  border-t-0 border">
            <GoUnlock className="  text-gray-300" />
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
          {/* remember checkbox & forget pass */}
          <div className="mt-4 flex sm:flex-row flex-col gap-3 justify-between sm:items-center items-start">
            <div className="form-control">
              <label className="label cursor-pointer justify-start items-center gap-3 text-start ">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-sm  rounded [--chkbg:theme(colors.primary-color)] [--chkfg:white] checked:border-0"
                />
                <span className="label-text text-sm">Remember me</span>
              </label>
            </div>
            <p className="text-sm text-primary-color font-medium text-end">
              Forget password?
            </p>
          </div>

          {/* button */}
          <div className="flex mt-4 items-center gap-2 sm:flex-row flex-col">
            <Button
              type="submit"
              className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-full sm:w-fit  "
            >
              Login Now
            </Button>
            <Link to={"/signup"} className="w-full sm:w-fit">
              <ButtonOutlined label={"Create New Account"} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
