import React, { useContext, useState } from "react";
import { GoEye, GoEyeClosed, GoMail, GoUnlock } from "react-icons/go";
import { Button } from "@material-tailwind/react";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared Component/Loading";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import swal from "sweetalert";
import PrimaryButton from "../Shared Component/PrimaryButton";

export default function Login() {
  // states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginWithPass, loading, setLoading, resetPass } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const axiosBase = useAxiosBase();
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");

  const HandleSignin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true); // Start loading

    try {
      const userCredential = await loginWithPass(email, password);

      const username = userCredential?.user?.displayName || "";
      const response = await axiosBase.post("/login", { email, username });

      if (response.status === 201) {
        swal("Great!", response.data.message, "success");
        form.reset();
        navigate("/dashboard/reports");
        setLoading(false);
      }
    } catch (error) {
      swal("Oops!", error.message || "An unexpected error occurred", "error");
      setLoading(false); // Stop loading
    }
  };

  // reset pass
  const HandleResetPass = (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Check if email field is empty
    if (!resetEmail) {
      setError("Email field is required to reset password.");
      return;
    }

    resetPass(resetEmail)
      .then((res) => {
        swal("Email sent", "Please check your inbox.", "success"); 
        setLoading(false); 
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setError("Failed to send reset email. Please try again."); 
        setLoading(false); 
      });
  };


  return (
    <div id="login">
      {loading && <Loading />}

      <div
        className={`card-body bg-white  mx-auto right-0 left-0 md:static w-11/12  text-center  flex flex-col justify-center  `}
      >
        {/* login top text */}
        <div>
          <div className="flex justify-center">
            <Link to={"/"}>
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-5xl rounded-full h-15 w-15 p-3 " />
            </Link>
          </div>
          <h1 className="md:text-2xl text-xl my-2 mb-3 font-medium text-primary-color ">
            Hello Again!
          </h1>
          <p className="text-gray-500 mb-6 text-sm ">
            It’s time to dive back into your journey. Enter your details to
            continue.
          </p>
        </div>
        <form onSubmit={HandleSignin}>
          <div className="border border-gray-200 rounded-md">
            <div className="relative ">
              <div className="absolute  inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <GoMail className=" text-gray-300 " />
              </div>
              <input
                onChange={(e) => setResetEmail(e.target.value)}
                name="email"
                required
                type="email"
                className={`bg-white  rounded-none outline-0  text-sm block w-full ps-10 p-2.5 text-gray-800 focus:outline-none ${
                  error && "border border-red-500 rounded-t"
                }`}
                placeholder={error ? error : "example@gmail.com"}
              />
            </div>

            {/* pass */}
            <div className="relative">
              <div className="absolute  inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none border-t border-gray-200 ">
                <GoUnlock className=" text-gray-300" />
              </div>
              <input
                name="password"
                required
                type={passwordVisible ? "text" : "password"}
                className=" bg-white  rounded-none outline-0 border-gray-200   text-sm block w-full ps-10 p-2.5 text-gray-800  border-t  focus:outline-none"
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
          </div>
          {/* email */}

          {/* remember checkbox & forget pass */}
          <div className="mt-4 flex sm:flex-row flex-col-reverse gap-1 justify-between sm:items-center items-start">
            <div className="form-control">
              <label className="label cursor-pointer justify-start items-center gap-3 text-start ">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-xs  rounded [--chkbg:theme(colors.primary-color)] [--chkfg:white] checked:border-0"
                />
                <span className="label-text text-xs">Remember me</span>
              </label>
            </div>
            <Link
              onClick={HandleResetPass}
              className="label-text text-xs hover:underline duration-300 flex justify-end w-full sm:w-fit "
            >
              Reset Password
            </Link>
          </div>

          {/* button */}
          <div className="flex mt-4 items-center gap-2 md:flex-row flex-col">
            <PrimaryButton label={"Login Now"} style={"md:w-fit w-full"} />
            <Link to={"/signup"} className="w-full md:w-fit">
              <ButtonOutlined label={"Create New Account"} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
