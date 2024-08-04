import { Button } from "@material-tailwind/react";
import React from "react";

export default function ButtonOutlined({ label, style }) {
  return (
    <Button
      className={`bg-white  border  duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none ${
        style ? style : "w-full"
      }`}
    >
      {label}
    </Button>
  );
}
