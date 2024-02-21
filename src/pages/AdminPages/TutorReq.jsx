import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminComponents/Layouts/Sidebar";
import Navbar from "../../components/AdminComponents/Layouts/Navbar";
import { LoadTutorList, apporvTutor } from "../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import approval from "../../../public/images/admin/icons/approval.png";
import { TuotoApporuval } from "../../components/AdminComponents/modals/TuotoApporuval";


function Tutors() {
  const dispatch = useDispatch();
  const [isOpn, setOpn] = useState(false);
  const [tutor, setTutor] = useState([]);
  const [filter, setfiler] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    LoadTutorList()
      .then((res) => {
        const tutorList = res.data.tutordata;
        const activeTutors = tutorList.filter(
          (item) => item.is_Actived === "pending"
        );
        setTutor(activeTutors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTutor = async (userId) => {
    try {
      setOpn(true);
      const data = tutor.find((item) => item._id == userId);
      setfiler(data);
    } catch (error) {
      console.error(error);
    }
  };

  //===================== SEACHED DATA FETCHING  ============//

  const tutorDatas = tutor.filter((tutor) => {
    const searchLowerCase = searchInput.toLowerCase();
    const EmailMatch = tutor.email.toLowerCase().includes(searchLowerCase);
    const nameMatch = tutor.tutorName.toLowerCase().includes(searchLowerCase);
    const phoneMatch = tutor.phone.toString().includes(searchLowerCase);

    return EmailMatch || nameMatch || phoneMatch;
  });
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUserDatas = tutorDatas.slice(startIndex, endIndex);
  return (
    <div>
      {!isOpn ? (
        <>
          <Sidebar state={"tutorReq"} />
          <Navbar
            state={"TutorsReq"}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <div className="mt-12 mb-8 flex flex-col gap-12 p-4 xl:ml-80">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                  Tutor Request List
                </h6>
              </div>
              <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                {tutorDatas && tutorDatas.length > 0 ? (
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
                            tutorName
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                          <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                            Email
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                          <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                            phone
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                          <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                            ID Proof
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                          <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                            approvel
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutorDatas.map((values, index) => (
                        <tr key={values._id}>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              {index + 1}
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              {values.tutorName}
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              {values.email}                            
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              {values.phone}               
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <img
                                className="w-24 h-16"
                                src={values.image}
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <button
                                className="relative grid items-center font-sans uppercase whitespace-nowrap select-none "
                                data-projection-id="1"
                                style={{ opacity: 1 }}
                                onClick={() => handleTutor(values._id)}
                              >
                                <img
                                  className="w-10 h-10"
                                  src={approval}
                                  alt=""
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center text-gray-600">
                    No tutors to display.
                  </div>
                )}
                <div className="flex justify-center mt-4">
                  <ReactPaginate
                    previousLabel={
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-xl"
                      />
                    }
                    nextLabel={
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xl"
                      />
                    }
                    breakLabel={"..."}
                    pageCount={Math.ceil(tutorDatas.length / itemsPerPage)}
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
        </>
      ) : (
        <TuotoApporuval filter={filter} setOpn={setOpn} />
      )}
    </div>
  );
}

export default Tutors;
