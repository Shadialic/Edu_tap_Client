import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import tutor from "../../../../public/images/admin/icons/tutor.png";
import tutorReq from "../../../../public/images/admin/icons/tutorReq.png";
import courseicon from "../../../../public/images/admin/icons/courseicon.png";
import categoryIcon from "../../../../public/images/admin/icons/categoryIcon.png";
import control_Course from "../../../../public/images/admin/icons/control_course.png";

export const Sidebar = ({ state }) => {
  return (
    <aside className="bg-white mt-2 shadow-sm -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 overflow-x-hidden">
      <div className=" flex mt-8 ">
        <img src={logo} className=" rounded-lg w-[30%] h-[36%] ml-4" />
        <a className="py-6 px-8 text-center" href="#/">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
            Edu-tap
          </h6>
        </a>
      </div>
      <div
        className="m-4 overflow-auto "
        style={{ maxHeight: "calc(100vh - 220px)" }}
      >
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <a className="">
              <Link
                to="/admin/dashboard"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "Dashboard"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  dashboard
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="">
              <Link
                to="/admin/users"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "users"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                } w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Users
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="">
              <Link
                to="/admin/tutors"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "tutor"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <img className="w-5 h-5 text-inherit" src={tutor} alt="" />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Tutors
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="">
              <Link
                to="/admin/tutorsReq"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "tutorReq"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <img className="w-5 h-5 text-inherit" src={tutorReq} alt="" />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Tutors Request
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="" href="#/dashboard/notifications">
              <Link
                to="/admin/displayCourse"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "disCourses"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <img className="w-5 h-5 text-inherit" src={courseicon} alt="" />

                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Courses
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="" href="#/dashboard/notifications">
              <Link
                to="/admin/category"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "Category"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <img
                  className="w-5 h-5 text-inherit"
                  src={categoryIcon}
                  alt=""
                />

                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Catogary
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="" href="#/dashboard/notifications">
              <Link
                to="/admin/offers"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "offers"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <img
                  className="w-5 h-5 text-inherit"
                  src={control_Course}
                  alt=""
                />

                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Offers
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="" href="#/dashboard/notifications">
              <Link
                to="/admin/course"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "Course"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <img
                  className="w-5 h-5 text-inherit"
                  src={control_Course}
                  alt=""
                />

                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Course Control
                </p>
              </Link>
            </a>
          </li>
          <li>
            <a className="" href="#/dashboard/notifications">
              <Link
                to="/admin/payment"
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  state == "Payment Report"
                    ? `bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white`
                    : `text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30`
                }  w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <img
                  className="w-5 h-5 text-inherit"
                  src={control_Course}
                  alt=""
                />

                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Payment Report
                </p>
              </Link>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
