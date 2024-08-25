import React from "react";

export default function Loading({style}) {
  return (
    <div className={`opacity-50 top-0 bottom-0 left-0 right-0 w-full h-full bg-white flex justify-center items-center z-40 fixed ${style}` }>
          <span className="loading loading-ring loading-lg text-primary-color"></span>

    </div>
  );
}
