import React, { useState } from "react";
import Breadcrumbs from "../Shared Component/Breadcrumbs";
import { Button } from "@material-tailwind/react";

export default function AddNewFinance() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {};

  const HandleNewFinanceAdd = (e) => {
    e.preventDefault();
  };

  const togglePasswordVisibility = () => {};

  return (
    <div className="">
      {/* breadcrumbs add */}
      <Breadcrumbs
        routeLabel={"Add a new Finance"}
        routePath={"dashbaord / ceo / addnewfinance"}
      />

      <form onSubmit={HandleNewFinanceAdd} className="bg-white px-6 py-12 mt-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Confirm Password:
            </label>
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Select the branch</span>
          </div>
          <select className="select select-bordered">
            <option disabled selected>
              Pick one
            </option>
            <option>Uk</option>
            <option>USA</option>
            <option>Bangladesh</option>
          </select>
        </label>
        <Button
          type="submit"
          className="mt-5 rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-full sm:w-fit  "
        >
          Add new finance
        </Button>
      </form>
    </div>
  );
}
