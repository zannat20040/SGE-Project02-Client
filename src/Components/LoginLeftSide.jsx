import { Carousel } from "@material-tailwind/react";
import React from "react";
import ButtonOutlined from "../Shared Component/ButtonOutlined";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowRoundDown } from "react-icons/io";

export default function LoginLeftSide() {
  const location = useLocation();

  return (
    <div className="relative items-center justify-center bg-primary-color w-full flex md:h-full min-h-screen ">
      {/* background design */}
      <div className="absolute -top-2 left-[20%] h-16 w-16 rounded-full bg-gradient-to-br from-white via-secondary-color to-primary-color"></div>
      <div className="absolute bottom-[18%] left-[20%] h-20 w-20 rounded-full bg-gradient-to-br from-white via-secondary-color to-primary-color"></div>
      <div className="absolute right-0 md:-right-7 top-[50%] h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-secondary-color to-primary-color transition-all"></div>
      <div className="absolute left-[50%] top-[22%] h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-white via-secondary-color to-primary-color"></div>
      {/* text slider */}
      <div className="z-10 space-y-2 text-center ">
        <Carousel
          autoplay={true}
          autoplayDelay={2000}
          loop={true}
          className="rounded-xl lg:w-2/3 sm:w-1/2 w-1/3 mx-auto "
          prevArrow={0}
          nextArrow={0}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          <div className="pb-5">
            <h1 className="text-2xl my-2 mb-3 font-semibold tracking-widest text-white">
              Simplify Your Office Expenses
            </h1>
            <p className="text-white mb-6 text-sm">
              Effortlessly manage and track expenses with our intuitive
              platform. Sign in to start managing your costs.
            </p>
          </div>
          <div className="pb-8">
            <h1 className="text-2xl my-2 mb-3 font-semibold tracking-widest text-white">
              Streamline Expense Management
            </h1>
            <p className="text-white mb-6 text-sm">
              From daily receipts to payroll, keep everything organized and
              accessible. Sign in to see how.
            </p>
          </div>
          <div className="pb-8">
            <h1 className="text-2xl my-2 mb-3 font-semibold tracking-widest text-white">
              Complete Control Over Finances
            </h1>
            <p className="text-white mb-6 text-sm">
              Empower your team with tools to track and approve expenses with
              ease. Login to take control.
            </p>
          </div>
          <div className="pb-8">
            <h1 className="text-2xl my-2 mb-3 font-semibold tracking-widest text-white">
              Track Your Daily Expenses
            </h1>
            <p className="text-white mb-6 text-sm">
              Easily log and manage your daily expenses with receipts. Sign in
              to start tracking.
            </p>
          </div>
        </Carousel>
      </div>
      <div className="absolute bottom-5 md:hidden flex  ">
        {location.pathname === "/signup" ? (
          <a href={"#signup"}>
            <ButtonOutlined label={"lets explore"} />
          </a>
        ) : (
          <a href={"#login"}>
            <ButtonOutlined label={"lets explore"} />
          </a>
        )}
      </div>
    </div>
  );
}
