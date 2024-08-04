import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function SelectInput({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Choose One");

  return (
    // <div className="relative w-full">
    //   {/* dropdown - btn */}
    //   <div
    //     onClick={() => setIsOpen(!isOpen)}
    //     className="mx-auto flex w-full items-center justify-between rounded-xl  px-2 py-3 "
    //   >
    //     <h1 className=" text-gray-400 text-sm font-normal">{selectedValue}</h1>
    //     <MdOutlineKeyboardArrowDown
    //       className={`${
    //         isOpen ? "-rotate-180" : "rotate-0"
    //       } duration-300 text-gray-400`}
    //     />
    //   </div>

    //   {/* dropdown - options  */}
    //   <div
    //     className={`${
    //       isOpen ? "visible top-0 opacity-100" : "invisible -top-4 opacity-0"
    //     } absolute top-8 mx-auto my-4 w-full h-40 overflow-y-scroll py-4 border duration-300 bg-white z-40 rounded-none`}
    //   >
    //     {options?.map((option, idx) => (
    //       <div
    //         key={idx}
    //         onClick={(e) => {
    //           setSelectedValue(e.target.textContent);
    //           setIsOpen(false);
    //         }}
    //         className="px-6 py-2 text-gray-500 hover:bg-gray-100"
    //       >
    //         {option}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div class="custom-select" >
      <select className="select-selected">
        <option value="0">Select car:</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
        <option value="3">Citroen</option>
        <option value="4">Ford</option>
        <option value="5">Honda</option>
        <option value="6">Jaguar</option>
        <option value="7">Land Rover</option>
        <option value="8">Mercedes</option>
        <option value="9">Mini</option>
        <option value="10">Nissan</option>
        <option value="11">Toyota</option>
        <option value="12">Volvo</option>
      </select>
    </div>
  );
}
