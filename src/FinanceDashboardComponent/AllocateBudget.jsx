import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Progress,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import useBranchExpense from "../Hooks & Context/useBranchExpense";
import useUserInfo from "../Hooks & Context/useUserInfo";
import useAxiosBase from "../Hooks & Context/useAxiosBase";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { MdAttachMoney } from "react-icons/md";

export default function AllocateBudget() {
  const [open, setOpen] = React.useState(1);
  const { userinfo } = useUserInfo();
  const axiosBase = useAxiosBase();
  const { user } = useContext(AuthContext);

  const {
    data: allBudgets,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBudgets", user?.email, userinfo?.branch],
    queryFn: async () => {
      const response = await axiosBase.get(
        `finance/budgets?branch=${userinfo?.branch}&additionalBranch=all`,
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

  console.log(allBudgets);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div>
      {allBudgets?.map((employee, index) => (
        <Accordion open={open === index + 1}>
          <AccordionHeader
            onClick={() => handleOpen(index + 1)}
            className="flex justify-between items-center gap-10 border-0"
          >
            <div className="flex flex-col items-start text-start w-full">
              <p className="font-normal capitalize text-base">
                {" "}
                {employee?.name}
              </p>
              <p className="text-xs font-medium text-gray-500 ">
                {" "}
                {employee?.email}
              </p>
            </div>
            <p className="text-right text-base font-semibold text-primary-color">
              +{employee?.givenBudget}
            </p>
          </AccordionHeader>
          <Progress
            value={(
              ((employee?.givenBudget - employee?.remainingBudget) /
                employee?.givenBudget) *
              100
            ).toFixed(2)}
            size="sm"
            color={
              ((employee?.givenBudget - employee?.remainingBudget) /
                employee?.givenBudget) *
                100 >=
              70
                ? "red"
                : ((employee?.givenBudget - employee?.remainingBudget) /
                    employee?.givenBudget) *
                    100 >=
                  40
                ? "amber"
                : "green"
            }
          />
          <AccordionBody>
            <div>
              <p className="font-normal">
                Budget Allocated On :{" "}
                <span className="font-semibold text-gray-500">
                  {employee?.allocationDate.split("T")[0]}
                </span>
              </p>
              <p className="font-normal">
                Allocation Due to :{" "}
                <span className="font-semibold text-gray-500">
                  {employee?.dueDate ? employee?.dueDate?.split("T")[0] : 'Not allocated'}
                </span>
              </p>
            </div>

            <div>
              <form className="flex justify-between bg-white mt-6 border-2 rounded-full ">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
                    <MdAttachMoney className="text-gray-400" />
                  </div>
                  <input
                    name="amount"
                    required
                    type="text"
                    className=" rounded-l-full bg-white hover:bg-gray-100 rounded-none outline-none  text-sm block w-full ps-10 p-2.5 text-gray-800   h-full "
                    placeholder="Enter allocated budget amount"
                  />
                </div>
                <Button
                  // disabled={isLessThanFifty}
                  type="submit"
                  className={`rounded-full bg-primary-color border rounded-l-none border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-1/5`}
                >
                  Add this
                </Button>
              </form>
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}
