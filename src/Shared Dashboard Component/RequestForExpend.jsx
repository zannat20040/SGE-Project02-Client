import React, { useContext, useState } from "react";
import BreadcrumsLayout from "../Shared Component/BreadcrumsLayout";
import useUserInfo from "../Hooks & Context/useUserInfo";
import Loading from "../Shared Component/Loading";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Button } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { PiSubtitlesThin } from "react-icons/pi";

export default function RequestForExpend() {
  const { userinfo } = useUserInfo();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const HandleBudgetExpend = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const amount = form.amount.value;
    const note = form.note.value;

    const requestData = {
      name,
      email,
      requestBudget: parseFloat(amount),
      requestNote: note,
    };

    console.log("data====>", requestData);
  };

  return (
    <div>
      {loading && <Loading />}
      <BreadcrumsLayout
        route1={userinfo?.role}
        activeroute2={"budget-expend"}
      />
      <div className="bg-white px-6 py-10 mt-3">
        <form action="" onSubmit={HandleBudgetExpend}>
          <h1 className="md:text-lg text-base font-semibold capitalize mb-4 text-primary-color tracking-wider">
            Request for budget expend
          </h1>
          <div className="border border-gray-200">
            {/* name, email */}
            <div className="grid grid-cols-2 ">
              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  required
                  disabled
                  value={user?.displayName}
                  name="name"
                  type="text"
                  className={`bg-white focus:outline-none hover:bg-gray-100 border-b rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800 border-r`}
                />
              </div>
              {/* email */}
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMail className="text-gray-400" />
                </div>
                <input
                  required
                  disabled
                  value={user?.email}
                  name="email"
                  type="email"
                  className={`bg-white focus:outline-none hover:bg-gray-100 border-b rounded-none outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800`}
                />
              </div>
            </div>
            {/* amount */}
            <div className="relative sm:col-span-3 md:col-span-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MdAttachMoney className="text-gray-400" />
              </div>
              <input
                name="amount"
                required
                type="number"
                step="0.01"
                className="bg-white hover:bg-gray-100 rounded-none outline-none border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800 h-full "
                placeholder="Requested Amount"
              />
            </div>
            {/* NOTES */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center ps-3.5 pointer-events-none">
                <PiSubtitlesThin className="text-gray-400" />
              </div>
              <textarea
                name="note"
                className="bg-white hover:bg-gray-100 border-t outline-0 border-gray-200 text-sm block w-full ps-10 p-2.5 text-gray-800 focus:outline-none rounded-none h-full "
                placeholder="Write your request note ...(optional)"
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none md:w-fit w-full flex justify-end`}
            >
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
