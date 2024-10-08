import { Button, IconButton } from "@material-tailwind/react";
import React from "react";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";

export default function PaginationLayout({
  prev,
  next,
  active,
  setActive,
  isFetching,
  totalPages,
}) {
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: `rounded-full ${
      active === index
        ? "bg-primary-color text-white"
        : "bg-white text-primary-color"
    }`,
  });

  return (
    <>
      <Button
        variant="text"
        className="flex items-center  rounded-full font-medium text-xs gap-1"
        onClick={prev}
        disabled={active === 1 || isFetching}
      >
        <HiOutlineArrowLongLeft strokeWidth={1} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center ">
        {totalPages > 0 &&
          [...Array(totalPages)?.keys()]?.map((page) => (
            <IconButton
              key={page + 1}
              {...getItemProps(page + 1)}
              {...getItemProps(page + 1)}
              disabled={isFetching}
            >
              {page + 1}
            </IconButton>
          ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full font-medium text-xs "
        onClick={next}
        disabled={active === totalPages || isFetching}
      >
        Next
        <HiOutlineArrowLongRight strokeWidth={1} className="h-4 w-4 " />
      </Button>
    </>
  );
}
