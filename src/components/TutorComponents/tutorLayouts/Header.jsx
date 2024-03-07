import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/images/logoO.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const navigate = useNavigate();
  const tutor = useSelector((state) => state.tutor.tutorInfo);
  const tutorName = tutor.name;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const loginhandle = () => {
    navigate("/vendor/login");
  };

  const handlelogout = () => {
    localStorage.removeItem("tutortoken");
    navigate("/vendor/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-fef7e5 shadow-md ">
      <div className="container mx-auto ">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div className="flex items-center justify-between  ">
            <div className="flex flex-row lg:pb-2 ">
              <img src={logo} alt="" className="w-18 h-16  " />
              <h2 className="pt-3 lg:text-xl    sm:text-xl  font-bold mt-2  font-prompt font-prompt-normal">
                Edu-tap
              </h2>
            </div>
            <div className="lg:hidden ">
              <button onClick={handleShowNavbar}>
                <svg className="h-6 w-6 fill-current mb-" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`lg:flex lg:items-center lg:w-auto ${
              showNavbar ? "block" : "hidden"
            }`}
          >
            <ul className="lg:flex pl-2 lg:items-center lg:justify-end font-prompt">
              <li>
                <NavLink
                  exact
                  to="/vendor/"
                  activeClassName="active-link"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vendor/waitinglist"
                  activeClassName="active-link"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  Waiting List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vendor/runningClasses"
                  activeClassName="active-link"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  Running Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vendor/PaymentReport"
                  activeClassName="active-link"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  Payment Report
                </NavLink>
              </li>
              {localStorage.getItem("tutortoken") ? (
                <li className="sm:mt-0 lg:p-4 py-2 px-0">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-auto sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200 lg:w-auto"
                  >
                    {tutorName}
                  </button>
                  {isOpen && (
                    <div
                      className={`sorigin-top-right absolute right-0 mt-2 sm:mt-4 w-55 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none lg:w-auto lg:absolute`}
                    >
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
                        <Link
                          to="/vendor/chat "
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#7d0fc6]"
                          role="menuitem"
                        >
                          Chat
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
                </li>
              ) : (
                <li>
                  <button
                    onClick={loginhandle}
                    className="inline-flex justify-center mt-2 w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
