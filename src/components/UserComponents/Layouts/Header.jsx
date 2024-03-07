import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logoO.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../Redux/userSlice/userSlice";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userName = userInfo.userName;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const loginhandle = () => {
    navigate("/login");
  };

  const handlelogout = () => {
    localStorage.removeItem("token");
    dispatch(
      resetState({
        id: "",
        name: "",
        email: "",
        phone: "",
      })
    );
    navigate("/");
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
                  to="/"
                  activeClassName="active-link"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/course"
                  activeClassName="active"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  activeClassName="active"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  activeClassName="active"
                  className="lg:p-4 py-2 px-0 block hover:text-[#7d0fc6]"
                >
                  Blog
                </NavLink>
              </li>
              {localStorage.getItem("token") ? (
                <li className="sm:mt-0 lg:p-4 py-2 px-0">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-auto sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200 lg:w-auto"
                  >
                    {userName}
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
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#7d0fc6]"
                          role="menuitem"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/chat"
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
};

export default Navbar;
