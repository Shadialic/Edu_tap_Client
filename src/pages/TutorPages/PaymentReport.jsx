import React from "react";
import Header from "../../components/TutorComponents/TutorLayouts/Header";

function PaymentReport() {
  const nav_title = [
    { display: "No" },
    { display: "Date" },
    { display: "PaymentId" },
    { display: "Student Name" },
    // { display: "Tutor Name" },
    { display: "Course Name" },
    { display: "Amount" },
    // { display: "Pay to Tutor" },
  ];

  return (
    <>
      <Header />
      <div className="w-screen h-screen overflow-hidden flex justify-center">
        <div className="flex justify-center items-center flex-col w-[90%] h-[100%] bg-violet-700">
          <h1 className="flex text-3xl font-prompt p-6 text-white">
            Payment History
          </h1>
          <div className="flex flex-col w-[95%] h-[90%] bg-white gap-24 ">
            <div>
              <div className="flex flex-row gap-24">
                {nav_title.map((item) => (
                  <div
                    key={item.display}
                    className="font-prompt hover:cursor-pointer py-2 px-4"
                  >
                    {item.display}
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-gray-100   mb-14"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentReport;
