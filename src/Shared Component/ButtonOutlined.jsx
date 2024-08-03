import { Button } from "@material-tailwind/react";
import React from "react";

export default function ButtonOutlined({label}) {
  return (
    <Button className="bg-white  border  duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none">
     {label}
    </Button>
  );
}
