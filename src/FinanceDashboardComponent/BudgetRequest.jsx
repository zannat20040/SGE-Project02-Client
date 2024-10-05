import React, { useContext, useState } from "react";
import useUserInfo from "../Hooks & Context/useUserInfo";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ButtonLoading from "../Shared Component/ButtonLoading";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "@material-tailwind/react";
import { IoIosPrint } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";

export default function BudgetRequest() {
  const { userinfo } = useUserInfo();
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [openForm, setOpenForm] = useState(false);

  const {
    data: expendRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expendRequests", user?.email, userinfo?.branch],
    queryFn: async () => {
      const response = await axiosBase.get(
        `/finance/getUsers?branch=${userinfo?.branch}&additional=all&role=employee,ceo,admin&action=request`,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );

      const data = response?.data?.users || [];
      return data;
    },
  });

  const HandleAccept = (data) => {
    console.log("======data===>", data);
  };
  const HandleChange = () => {};

  return (
    <div>
      <div>
        {isLoading ? (
          <p className="text-center py-4">
            <ButtonLoading />
          </p>
        ) : expendRequests && expendRequests?.length <= 0 ? (
          <p className="text-center py-4 text-black">No data available</p>
        ) : (
          <div className=" shadow px-5">
            {expendRequests &&
              expendRequests?.map((data, idx) => (
                <Accordion open={open === idx + 1} key={data?._id} className="">
                  {/* header */}
                  <AccordionHeader
                    onClick={() => handleOpen(idx + 1)}
                    className="flex justify-between items-center gap-x-5 border-b border-gray-300"
                  >
                    <div className="flex flex-col items-start text-start w-full">
                      <p className="font-medium capitalize text-base">
                        {data?.firstName + " " + data?.lastName}
                      </p>
                      <p className="text-xs font-medium text-gray-500 ">
                        {data?.email}
                      </p>
                    </div>
                    <p className="text-right text-sm font-semibold uppercase text-gray-600 w-fit">
                      {data?.branch}
                    </p>
                  </AccordionHeader>

                  {/* body */}
                  <AccordionBody>
                    <div className="font-medium">
                      <p>
                        Due time: {data?.budget?.allocationDate.split("T")[0]} -{" "}
                        {data?.budget?.dueDate.split("T")[0]}
                      </p>
                      <p>
                        Given budget:{" "}
                        <span className="text-gray-700 font-semibold ">
                          ${data?.budget?.givenBudget}
                        </span>{" "}
                      </p>
                      <p>
                        Remaining budget:{" "}
                        <span className="text-gray-700 font-semibold ">
                          ${data?.budget?.remainingBudget}
                        </span>
                      </p>
                      <p>
                        Request budget:{" "}
                        <span className="text-gray-700 font-semibold ">
                          ${data?.budget?.requestBudget}
                        </span>
                      </p>
                      <p>Request Note: {data?.budget?.requestNote}</p>
                    </div>

                    {openForm && (
                      <form className="flex border border-gray-300 rounded-full mt-5">
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
                            <MdAttachMoney className="text-gray-400" />
                          </div>
                          <input
                            name="amount"
                            required
                            type="number"
                            step="0.01"
                            className=" rounded-l-full bg-white hover:bg-gray-100 rounded-none outline-none  text-sm block w-full ps-10 p-2.5 text-gray-800   h-full "
                            placeholder="Enter the amount"
                          />
                        </div>
                        <Button
                          type="submit"
                          className={`rounded-full bg-primary-color border rounded-l-none border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-2/5`}
                        >
                          Add this
                        </Button>
                      </form>
                    )}

                    <div
                      className={`${
                        openForm ? "mt-2 " : "mt-5"
                      } flex gap-2 justify-end`}
                    >
                      {/* form */}
                      <Button
                        onClick={() => setOpenForm(!openForm)}
                        type="submit"
                        className={`rounded-full bg-primary-color border  border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-fit `}
                      >
                        {openForm ? "Cancel" : " Change the Amount"}
                      </Button>
                      {openForm || (
                        <Button
                          onClick={() => HandleAccept(data)}
                          type="button"
                          className={`rounded-full bg-primary-color border  border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-fit `}
                        >
                          Accept the request
                        </Button>
                      )}
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
