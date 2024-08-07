import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function ImageModal({imgsrc}) {
  const [openModal, setOpenModal] = useState(false);
  console.log(imgsrc)

  return (
    <div className="flex items-center justify-center">
      
      <img
        onClick={() => setOpenModal(true)}
        src={imgsrc}
        className="w-12 h-12 bg-black/30 text-white rounded cursor-pointer"
        alt="modal navigate ui"
      />
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed flex justify-center items-center z-40 ${
          openModal ? "visible opacity-1" : "invisible opacity-0"
        } inset-0   bg-black/70 duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute drop-shadow-2xl rounded-lg ${
            openModal
              ? "opacity-1 duration-300 translate-y-0"
              : "-translate-y-20 opacity-0 duration-150"
          } group overflow-hidden`}
        >
          <div className="relative w-2/3  mx-auto ">
            {/* image */}
            <img
              src={imgsrc}
              className=""
              alt="modal navigate ui"
            />

            {/* close button */}
            <IoIosClose
              onClick={() => setOpenModal(false)}
              className="w-10 mx-auto hover:opacity-60 absolute top-0 right-0 drop-shadow-[0_0_10px_black] cursor-pointer z-30 text-black  h-10 bg-white "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
