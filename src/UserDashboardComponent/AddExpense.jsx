import React from "react";
import Breadcrumbs from "../Shared Component/Breadcrumbs";
import {
  Button,
  Input,
  MenuItem,
  Select,
  Textarea,
} from "@material-tailwind/react";
import FileUpload from "../Shared Component/FileUpload";

export default function AddExpense() {
  const [value, setValue] = React.useState("react");

  const HandleExpenseAdd = (e) => {};
  return (
    <div>
      {/* breadcrumbs add */}
      <Breadcrumbs
        routeLabel={"Add Expense"}
        routePath={"dashbaord / employee / addexpense"}
      />

      {/* FORM */}
      <form
        onSubmit={HandleExpenseAdd}
        className="bg-white px-10 py-14 mt-4 rounded-lg shadow-md"
      >
        {/* title & amount */}
        <div className="grid grid-cols-2 gap-3 ">
          <div className="mb-4">
            <Input
              type="text"
              id="title"
              name="title"
              label=" Expense Title"
              required
              placeholder="Buy a course.."
            />
          </div>

          <div className="mb-4">
            <Input
              type="number"
              id="amount"
              name="amount"
              placeholder="1000"
              required
              label="Expense Amount"
            />
          </div>
        </div>

        {/* CATAGORY  */}
        <div className="mb-4">
          <Select
            label="Expense Category"
            value={value}
            onChange={(e) => setValue(e.target)}
          >
            <MenuItem value="transportation">
              Transportation and Parking
            </MenuItem>
            <MenuItem value="marketing">Marketing and Advertising</MenuItem>
            <MenuItem value="health">Health and Safety</MenuItem>
            <MenuItem value="remote">Remote Work Expenses</MenuItem>
            <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
            <MenuItem value="meals">Meals and Entertainment</MenuItem>
            <MenuItem value="communication">Communication</MenuItem>
            <MenuItem value="professional">Professional Development</MenuItem>
            <MenuItem value="client">Client-Related Expenses</MenuItem>
            <MenuItem value="office">Office Supplies</MenuItem>
          </Select>
        </div>

        {/* DATE */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          ></label>
          <Input
            type="date"
            id="date"
            name="date"
            required
            label=" Choose Expense Date"
          />
        </div>

        {/* NOTES */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="notes"
          >
            Notes
          </label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="write here your aditional notes...(optional)"
          />
        </div>

        {/* FILE UPLOAD */}
        <FileUpload />

        <Button
          type="submit"
          className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-full sm:w-fit  "
        >
          Add this
        </Button>
      </form>
    </div>
  );
}
