import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logoO.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../Redux/userSlice/userSlice";

import Notification from "../Notification/Notification";

function Header({ state }) {
  const [isOpn, setOpn] = useState(false);
  const notificationModal = () => {
    setOpn(true);
  };
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userName = userInfo.userName;

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

  const nav_title = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/course",
      display: "Courses",
    },
    {
      path: "/about",
      display: "About Us",
    },
    {
      path: "/blog",
      display: "Blog ",
    },
  ];

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="flex shadow-md z-10">
        <div className="flex flex-row items-center">
          <img src={logo} alt="" className="w-18 h-16 ml-3" />
          <h2 className="text-2xl font-prompt font-prompt-normal mt-2  text-[#000000]">
            Edu-tap
          </h2>
        </div>
        <div className="flex flex-row gap-10 absolute right-20 font-prompt">
          {nav_title.map((item) => (
            <h4
              className={`font-prompt-normal hover:cursor-pointer mt-4 hover:text-[#7d0fc6] ${
                state === item.display ? "text-[#7d0fc6]" : "text-black"
              }`}
              key={item.display}
              onClick={() => navigateTo(item.path)}
            >
              {item.display}
            </h4>
          ))}
          <div className="text-center  hover:text-violet-600">
            <Notification />
          </div>

          {localStorage.getItem("token") ? (
            <button
              onClick={toggleDropdown}
              type="button"
              className="inline-flex justify-center mt-2 w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
            >
              {userName}
            </button>
          ) : (
            <button
              onClick={loginhandle}
              type="button"
              className="inline-flex justify-center mt-2 w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
            >
              Login
            </button>
          )}
          <div className="relative inline-block text-left justify-center items-center  sm:mt-2 ">
            {isOpen && (
              <div className="origin-top-left absolute left-0 mt-2 sm:mt-4 w-55 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
