import { Button } from "@material-tailwind/react";
import React from "react";
import { TfiDownload } from "react-icons/tfi";
import { saveAs } from 'file-saver';

export default function FileDownload({ data }) {

  // get a single expense data
  const HandleDownload = async (data) => {
    const correctedPath = data?.receipt[0]?.downloadLink;
    const response = await fetch(correctedPath);
    const blob = await response.blob();
    saveAs(blob, data?.receipt[0]?.downloadLink); 
  };
  return (
    <Button
      onClick={() => HandleDownload(data)}
      className={`bg-white  border  duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none  w-fit`}
    >
      {<TfiDownload />}
    </Button>
  );
}
