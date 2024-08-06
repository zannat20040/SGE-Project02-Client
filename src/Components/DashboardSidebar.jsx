import { Button } from "@material-tailwind/react";
import React, { useContext, useRef } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import NavlistForUser from "../Navlist/NavlistForUser";
import { FaBars } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared Component/Loading";
import MemberHistoryDownload from "../UserDashboardComponent/MemberHistoryDownload";
import useUserInfo from "../Hooks & Context/useUserInfo";
import NavlistForCEO from "../Navlist/NavlistForCEO";
import NavlistForFinance from "../Navlist/NavlistForFinance";
import swal from "sweetalert";


export default function DashboardSidebar() {
  const { signOutProfile, loading, setLoading } = useContext(AuthContext);

  const { userinfo } = useUserInfo();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();

  const HandleLogout = () => {
    signOutProfile()
      .then(() => {
        navigate("/");
        swal("Sad!", "Come back soon.", "success");
      })
      .catch((error) => {
        swal("Ops!", error, "error");
      });
  };

  return (
    <div className="drawer lg:drawer-open w-fit relative ">
      {loading && <Loading style={"z-50"} />}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start fixed bottom-4 left-4 z-20">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="bg-primary-color text-white p-3 rounded-full drawer-button lg:hidden"
        >
          <FaBars />
        </label>
      </div>
      <div className="drawer-side fixed left-0 top-0 z-40">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}
        <ul className="menu bg-white text-base-content min-h-full w-60 shadow-xl p-0 flex flex-col justify-between">
          <div>
            {/* logo */}
            <Link
              to={"/"}
              className="flex justify-center gap-2 items-center  p-4"
            >
              <AiOutlineGlobal className="bg-primary-color text-white border border-gray-200 text-2xl rounded-full h-8 w-8" />
              <h1 className="font-bold  tracking-widest uppercase text-primary-color">
                Shabuj Global
              </h1>
            </Link>

            {/* nav menu */}
            <div className="pl-5 mt-14 ">
              {userinfo?.role === "employee" ? (
                <NavlistForUser />
              ) : userinfo?.role === "ceo" ? (
                <NavlistForCEO />
              ) : (
                <NavlistForFinance />
              )}
            </div>
          </div>

          {/* logout btn */}
          <div className="p-4 flex flex-col gap-1">
            <Button
              onClick={handlePrint}
              type="submit"
              className="rounded-full bg-primary-color border border-primary-color font-medium hover:border-primary-color hover:bg-white hover:text-primary-color duration-400 hover:shadow-none w-full  "
            >
              Download All History
            </Button>
            <Button
              onClick={HandleLogout}
              className={`bg-white  border  duration-400 hover:tracking-wider duration-200 rounded-full border-primary-color shadow-none text-primary-color font-medium hover:shadow-none w-full 
              }`}
            >
              Logout
            </Button>

            <MemberHistoryDownload ref={componentRef} />
          </div>
        </ul>
      </div>
    </div>
  );
}
