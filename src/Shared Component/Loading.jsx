import React from "react";

export default function Loading() {
  return (
    <div className="inset-0 bg-opacity-50  top-0 bottom-0 left-0 right-0 w-full h-full bg-[#9a934854] flex justify-center items-center z-30 fixed ">
      <div className="w-10 h-10">
        <div className="grid grid-cols-2 justify-center items-center gap-2 rounded-full">
          <span className="h-5 w-5 rounded-tl-full bg-primary-color animate-[ping_1.4s_linear_infinite]"></span>{" "}
          <span className="h-5 w-5 rounded-tr-full bg-primary-color animate-[ping_1.8s_linear_infinite]"></span>
          <span className="h-5 w-5 rounded-bl-full bg-primary-color animate-[ping_2.2s_linear_infinite]"></span>
          <span className="h-5 w-5 rounded-br-full bg-primary-color animate-[ping_2.6s_linear_infinite]"></span>
        </div>
      </div>
    </div>
  );
}
