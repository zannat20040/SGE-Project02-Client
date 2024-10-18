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
import { MdAttachMoney } from "react-icons/md";
import swal from "sweetalert";
import toast from "react-hot-toast";

export default function BudgetRequest() {
  const { userinfo } = useUserInfo();
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: expendRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expendRequests", user?.email, userinfo?.branch],
    queryFn: async () => {
      try {
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
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // console.warn("No users found:", error.response.data.message);
          return [];
        } else {
          // console.error("Error fetching users:", error);
          throw new Error("Failed to fetch users");
        }
      }
    },
  });

  const HandleAccept = async (data) => {
    const acceptedBudget = data.budget.requestBudget;

    swal({
      title: `The requested amount is $${acceptedBudget}`,
      text: "Once accepted, you will not be able to change this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willAccept) => {
      // Add async here to handle async operations
      if (willAccept) {
        try {
          // Use await to handle the asynchronous axios call
          const response = await axiosBase.patch(
            `/finance/acceptexpendreq/${data?._id}`,
            { amount: acceptedBudget },
            {
              headers: {
                Authorization: `Bearer ${user?.email}`,
              },
            }
          );

          if (response.status === 200) {
            swal(response.data.message, {
              icon: "success",
            });
            refetch(); // Make sure refetch is defined properly
          } else {
            swal("Failed to accept budget expension request.", {
              icon: "error",
            });
          }
        } catch (error) {
          // Use error.response to handle axios error messages from server
          swal(error.response?.data?.message || "An error occurred", {
            icon: "error",
          });
          // console.error(error);
        }
      } else {
        swal("You canceled the budget expansion");
      }
    });
  };

  // chnge amount
  const HandleChange = async (e, data) => {
    e.preventDefault();
    const acceptedBudget = e.target.amount.value;
    if (acceptedBudget <= 0) {
      toast.error("Please enter amount more than 0");
      return;
    }

    swal({
      title: `The requested amount is $${acceptedBudget}`,
      text: "Once accepted, you will not be able to change this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willAccept) => {
      // Add async here to handle async operations
      if (willAccept) {
        try {
          // Use await to handle the asynchronous axios call
          const response = await axiosBase.patch(
            `/finance/acceptexpendreq/${data?._id}`,
            { amount: acceptedBudget },
            {
              headers: {
                Authorization: `Bearer ${user?.email}`,
              },
            }
          );

          if (response.status === 200) {
            swal(response.data.message, {
              icon: "success",
            });
            refetch(); // Make sure refetch is defined properly
          } else {
            swal("Failed to accept budget expension request.", {
              icon: "error",
            });
          }
        } catch (error) {
          // Use error.response to handle axios error messages from server
          swal(error.response?.data?.message || "An error occurred", {
            icon: "error",
          });
        }
      } else {
        swal("You canceled the budget expansion");
      }
    });
  };
  return (
    <div>
      <div>
        {isLoading ? (
          <p className="text-center py-4">
            <ButtonLoading />
          </p>
        ) : expendRequests && expendRequests?.length <= 0 ? (
          <p className="text-center py-4 text-black">No request available</p>
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
                    <div className="font-normal">
                      <p>
                        Due time:{" "}
                        <span className="font-semibold text-gray-500">
                          {data?.budget?.allocationDate?.split("T")[0]} -{" "}
                          {data?.budget?.dueDate?.split("T")[0]}
                        </span>
                      </p>
                      <p>
                        Given budget:{" "}
                        <span className="font-semibold text-gray-500 ">
                          ${data?.budget?.givenBudget?.toFixed(2)}
                        </span>{" "}
                      </p>
                      <p>
                        Remaining budget:{" "}
                        <span className="font-semibold text-gray-500">
                          ${data?.budget?.remainingBudget?.toFixed(2)}
                        </span>
                      </p>
                      <p>
                        Request budget:{" "}
                        <span className="font-semibold text-gray-500 ">
                          ${data?.budget?.requestBudget?.toFixed(2)}
                        </span>
                      </p>
                      <p>Request Note: {data?.budget?.requestNote}</p>
                    </div>

                    {openForm && (
                      <form
                        className="flex border border-gray-300 rounded-full mt-5"
                        onSubmit={(e) => HandleChange(e, data)}
                      >
                        <Button
                          onClick={() => setOpenForm(!openForm)}
                          className={`rounded-full bg-primary-color border rounded-r-none border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-1/5`}
                        >
                          Cancel
                        </Button>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
                            <MdAttachMoney className="text-gray-400" />
                          </div>
                          <input
                            name="amount"
                            required
                            type="number"
                            step="0.01"
                            className=" bg-white hover:bg-gray-100 rounded-none outline-none  text-sm block w-full ps-10 p-2.5 text-gray-800   h-full "
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
                      {/* Allbuttons */}

                      {openForm || (
                        <>
                          <Button
                            onClick={() => setOpenForm(!openForm)}
                            type="submit"
                            className={`rounded-full bg-primary-color border  border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-fit `}
                          >
                            Change the Amount
                          </Button>
                          <Button
                            onClick={() => HandleAccept(data)}
                            type="button"
                            className={`rounded-full bg-primary-color border  border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-fit `}
                          >
                            Accept
                          </Button>
                          <Button
                            // onClick={() => HandleDeny(data)}
                            type="button"
                            className={`rounded-full bg-primary-color border  border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-fit `}
                          >
                            Deny
                          </Button>
                        </>
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
