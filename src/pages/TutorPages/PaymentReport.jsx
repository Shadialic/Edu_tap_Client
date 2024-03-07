import React, { useEffect, useState } from "react";
import Header from "../../components/TutorComponents/TutorLayouts/Header";
import { fetchPaymentReport } from "../../api/VendorApi";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Constans/Loader/Loader";

function PaymentReport() {
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tutor = useSelector((state) => state.tutor.tutorInfo);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await fetchPaymentReport(tutor.email);
        setReport(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching payment reports:", error);
      }
    };
    fetchReports();
  }, [tutor.email]);

  const nav_title = [
    { display: "No", width: "5%" },
    { display: "Date", width: "10%" },
    { display: "Student Id", width: "15%" },
    { display: "Course Name", width: "10%" },
    { display: "Amount", width: "5%" },
  ];

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <Header />
      <div className="w-screen h-screen overflow-hidden flex justify-center">
        <div className="flex justify-center items-center flex-col w-[90%] h-[100%] bg-violet-700">
          <h1 className="flex text-3xl font-prompt p-6 text-white">
            Payment History
          </h1>
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col w-[95%] h-[90%] bg-white gap-24 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    {nav_title.map((item, index) => (
                      <th
                        key={index}
                        className="font-prompt py-2 px-4 text-left" // Align text to left
                        style={{ width: item.width }}
                      >
                        {item.display}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.map((payment, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td
                        className="font-prompt py-2 px-4"
                        style={{ width: nav_title[0].width }}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="font-prompt py-2 px-4"
                        style={{ width: nav_title[1].width }}
                      >
                        {formatDate(payment.date)}
                      </td>
                      <td
                        className="font-prompt py-2 px-4"
                        style={{ width: nav_title[2].width }}
                      >
                        {payment.studentId}
                      </td>
                      <td
                        className="font-prompt py-2 px-4"
                        style={{ width: nav_title[3].width }}
                      >
                        {payment.courseName}
                      </td>
                      <td
                        className="font-prompt py-2 px-4 "
                        style={{ width: nav_title[4].width }}
                      >
                        {payment.Amount}
                      </td>{" "}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PaymentReport;
