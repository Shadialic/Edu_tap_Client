import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminComponents/Layouts/Sidebar";
import Navbar from "../../components/AdminComponents/Layouts/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPaymentReport } from "../../api/AdminApi";

import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function PaymentReport() {
  const [report, setReport] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchPaymentReport();
      console.log(response, "response");
      setReport(response.data.data);
    };
    fetch();
  }, []);
  console.log(report, "reportreport");
  const Preport = report.filter((report) => {
    const searchLowerCase = searchInput.toLowerCase();
    const studentId = report.studentId.toLowerCase().includes(searchLowerCase);
    const courseName = report.courseName
      .toLowerCase().includes(searchLowerCase);
    const tutorId = report.tutorId.toString().includes(searchLowerCase);
    const Amount = report.Amount?.toString().includes(searchLowerCase); // Optional chaining here
    return studentId || courseName || tutorId || Amount;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUserDatas = Preport.slice(startIndex, endIndex);
  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div>
      <Sidebar state={"Payment Report"} />
      <Navbar state={"Payment Report"}
       searchInput={searchInput}
       setSearchInput={setSearchInput} />
      <div className="mt-12 mb-8 flex flex-col gap-12 p-4 xl:ml-80">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              Payment Report
            </h6>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Id
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Date
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Payment Id
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Tutor Id
                    </p>
                  </th>

                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Stutudent Id
                    </p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                      Amount
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUserDatas.map((values, index) => (
                  <tr key={values._id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">{index + 1}</div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {formatDate(values.date)}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {values.PaymentId}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {values.studentId}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {values.tutorId}
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        {values.Amount}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <ReactPaginate
                previousLabel={
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                }
                nextLabel={
                  <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                }
                breakLabel={"..."}
                pageCount={Math.ceil(Preport.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(data) => setCurrentPage(data.selected)}
                containerClassName={"pagination flex gap-2"}
                activeClassName={
                  "bg-white-500 text-lightBlue-900 px-3 py-2 rounded"
                }
                previousClassName={
                  "border bg-[#075985] text-white rounded px-3 py-2 hover:bg-lightBlue-950"
                }
                nextClassName={
                  "border  bg-[#075985] text-white rounded px-3 py-2 hover:bg-lightBlue-950"
                }
                disabledClassName={"opacity-110"}
              />
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentReport;
