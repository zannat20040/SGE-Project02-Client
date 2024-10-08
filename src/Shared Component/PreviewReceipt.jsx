import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Button, Dialog } from "@material-tailwind/react";
``;
export default function PreviewReceipt({ data }) {
  // const HandlePreview = () => {
  //   const previewLink = data?.receipt?.[0]?.previewLink;
  //   console.log(previewLink);
  //   if (previewLink) {
  //     window.open(previewLink, "_blank", "noopener,noreferrer");
  //   }
  // };
  const [open, setOpen] = React.useState(false);
  console.log(data)
  console.log(data.receipt[0].previewLink)
 
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button
        onClick={handleOpen}
   
        className={`bg-white border duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none w-fit`}
      >
        <IoEyeOutline />
      </Button>
      <Dialog open={open} handler={handleOpen}>
      <div className="p-4">
          {data?.receipt?.[0]?.previewLink ? (
            <iframe
              src={data.receipt[0].previewLink}
              title="Receipt Preview"
              className="w-full h-[500px]" 
            ></iframe>
          ) : (
            <p>No preview available</p>
          )}
        </div>
      </Dialog>
    </>

  );
}
