import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
``
export default function PreviewReceipt({ data }) {
  const HandlePreview = () => {
    const previewLink = data?.receipt?.[0]?.previewLink;
    console.log(previewLink);
    if (previewLink) {
      window.open(previewLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button
      onClick={HandlePreview}
      className={`bg-white border duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none w-fit`}
    >
      <IoEyeOutline />
    </Button>
  );
}
