import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/images/logoO.png";

function Header() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const tutor = useSelector((state) => state.tutor.tutorInfo);
  const tutorName = tutor.name;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const loginhandle = () => {
    navigate("/vendor/login");
  };

  const handlelogout = () => {
    localStorage.removeItem("tutortoken");
    navigate("/vendor/login");
    setIsOpen(false);
  };

  const nav_title = [
    {
      path: "/vendor/",
      display: "Home",
    },
    {
      path: "/vendor/waitinglist",
      display: "Waiting List",
    },
    {
      path: "/vendor/runningClasses",
      display: "Running Classes",
    },
    {
      path: "/payment-report",
      display: "Payment Report",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center p-3 mb-3 border-b-2 border-white-500">
        <div className="flex items-center">
          <img src={logo} alt="" className="w-18 h-16 ml-3" />
          <h2 className="text-2xl font-prompt font-prompt-normal mt-2 text-[#000000]">
            Edu-tap
          </h2>
        </div>
        <div className="flex gap-5 items-center justify-end">
          {nav_title.map((item) => (
            <Link
              to={item.path}
              className="font-prompt hover:cursor-pointer mt-2 gap-2 hover:text-[#7d0fc6]"
              key={item.display}
            >
              {item.display}
            </Link>
          ))}
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                stroke-width="3"
                className="h-6 w-6 text-blue-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>

          {localStorage.getItem("tutortoken") ? (
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex justify-center items-center mt-2 w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
              >
                {tutorName}
              </button>
              {isOpen && (
                <div className="origin-top-left absolute left-0 mt-2 sm:mt-4 w-55 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/vendor/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#7d0fc6]"
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#7d0fc6]"
                      role="menuitem"
                      onClick={handlelogout}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={loginhandle}
              type="button"
              className="inline-flex justify-center items-center mt-2 w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
