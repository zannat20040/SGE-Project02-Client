import { Button } from "@material-tailwind/react";
import React from "react";

export default function PrimaryButton({ label, style }) {
  return (
    <Button
      type="submit"
      className={`rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none ${
        style ? style : "w-full"
      }`}
    >
      {label}
    </Button>
  );
}
