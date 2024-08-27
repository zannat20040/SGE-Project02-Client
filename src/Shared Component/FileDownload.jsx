import { Button } from "@material-tailwind/react";
import React from "react";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { TfiDownload } from "react-icons/tfi";

export default function FileDownload({ data }) {
  // get a single expense data
  const HandleExpense = async (data) => {
    // Extract username and receipt URLs
    const username = data.username;
    const receiptUrls = data.receipt;

    // Create a new instance of JSZip
    const zip = new JSZip();

    // Fetch each receipt and add it to the zip file
    await Promise.all(
      receiptUrls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        zip.file(`receipt${index + 1}.${blob.type.split("/")[1]}`, blob);
      })
    );

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });

    // Trigger download
    saveAs(content, `${username}_receipts.zip`);
  };
  return (
    <Button
      onClick={() => HandleExpense(data)}
      className={`bg-white  border  duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none  w-fit`}
    >
      {<TfiDownload />}
    </Button>
  );
}
