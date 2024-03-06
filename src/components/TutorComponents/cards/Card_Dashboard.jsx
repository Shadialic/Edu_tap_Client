import React from "react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
const Card_Dashboard = () => {
  const statisticsCardsData = [
    {
      color: "gray",
      icon: UsersIcon,
      title: "Total Students",
      value: "0",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: AcademicCapIcon,
      title: "Total's Courses",
      value: "0",
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "Pending Courses",
      value: "0~",
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "Payments",
      value: "$0",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];

  return (
    <div className="p-10 mb-10 grid gap-y-10 gap-x-16 md:grid-cols-4 xl:grid-cols-4 hover:placeholder:">
      {statisticsCardsData.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm"
        >
          <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-violet-900 to-violet-800 text-white shadow-violet-900/20 absolute grid h-12 w-12 place-items-center">
            {item.icon &&
              React.createElement(item.icon, { className: "h-6 w-6" })}
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              {item.title}
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {item.value}
            </h4>
          </div>
          {item.footer && (
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className={item.footer.color}>
                  {item.footer.value}&nbsp;
                </strong>
                {item.footer.label}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card_Dashboard;
