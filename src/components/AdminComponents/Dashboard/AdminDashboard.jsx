import React, { useEffect, useState } from "react";
import DateTime from "./DateTime";
import { getDashboardData } from "../../../api/AdminApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import courseicon from "../../../../public/images/admin/icons/courseicon.png";
import { faUsers, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alldata = await getDashboardData();
        setDashboard(alldata.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 p-4 xl:ml-80">
        <div className="bg-clip-border rounded-xl bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 shadow-lgw-[95%] h-auto">
          <div className="flex flex-row justify-between">
            <div className="p-6 text-start">
              <h1 className="font-prompt font-prompt-semibold">Hello Admin</h1>
              <h1 className="font-prompt">Welcome To Dashboard</h1>
              <p>Congratulations, you have some good news</p>
            </div>
            <div className="flex justify-center items-center pr-16 font-prompt font-prompt-semibold">
              <DateTime />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3 ml-6">
          <div className="w-[23%] h-36 bg-white shadow-lg shadow-gray-200 flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faUsers} className="w-44 h-10" />
            <div className="flex flex-row mt-4">
              <h1 className="pb-10 font-prompt uppercase">Total Users</h1>
              <p className="pl-2 font-prompt-semibold">{dashboard.user}</p>
            </div>
          </div>
          <div className="w-[23%] h-36 bg-white shadow-lg shadow-gray-200 flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faUsers} className="w-44 h-10" />
            <div className="flex flex-row mt-4">
              <h1 className="pb-10 font-prompt uppercase">Total Tutors</h1>
              <p className="pl-2 font-prompt-semibold">{dashboard.tutor}</p>
            </div>
          </div>{" "}
          <div className="w-[23%] h-36 bg-white shadow-lg shadow-gray-200 flex flex-col justify-center items-center">
            <img className="w-20 h-12 text-inherit" src={courseicon} alt="" />
            <div className="flex flex-row mt-4">
              <h1 className="pb-10 font-prompt uppercase">Total Course</h1>
              <p className="pl-2 font-prompt-semibold">{dashboard.course}</p>
            </div>
          </div>
          <div className="w-[23%] h-36 bg-white shadow-lg shadow-gray-200 flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faMoneyBill} className="w-44 h-10" />
            <div className="flex flex-row mt-4">
              <h1 className="pb-10 font-prompt uppercase">Total Revenue</h1>
              <p className="pl-2 font-prompt-semibold">{dashboard.course}</p>
            </div>
          </div>
          {/* Other dashboard components */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
