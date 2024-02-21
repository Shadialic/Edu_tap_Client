import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadCourse } from "../../../api/AdminApi";
import ApproveCourse from "./ApproveCourse";

function CourseMange() {
  const [course, setCourse] = useState([]);
  const [isOpn, setOpn] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    LoadCourse().then((res) => {
      const newData = res.data.data;
      setCourse(newData);
    });
  }, []);

  const courseDatas =
    course &&
    course.filter((course) => {
      return (
        course.is_varified === "false" &&
        ["title", "category", "description", "level", "payment"].some((prop) =>
          course[prop]
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        )
      );
    });

  const exploredata = async (courseId) => {
    setCurrentCourseId(courseId);
    setOpn(true);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUserDatas = courseDatas.slice(startIndex, endIndex);
  return (
    <div>
      {!isOpn ? (
        <div className="mt-12 mb-8 flex flex-col gap-12 p-4 xl:ml-80">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 shadow-lg -mt-6 mb-8 p-6">
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                Course Managing
              </h6>
            </div>
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              {courseDatas.length > 0 ? (
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
                          Title
                        </p>
                      </th>

                      <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                          Category
                        </p>
                      </th>

                      <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                          image
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                          Status
                        </p>
                      </th>
                    </tr>
                  </thead>
                  {
                    <tbody>
                      {courseDatas.map((values, index) => (
                        <tr key={values._id}>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              {index + 1}
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              {values.title}
                            </div>
                          </td>

                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              {values.category}
                            </div>
                          </td>

                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <img
                                src={values.image}
                                alt="Image"
                                className="w-10 h-10"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-5 border-b border-blue-gray-50">
                            <div className="flex items-center gap-4">
                              <button
                                className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20  rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
                                data-projection-id="1"
                                style={{ opacity: 1 }}
                                onClick={() => exploredata(values._id)}
                              >
                                <span>Explore</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  }
                </table>
              ) : (
                <p className="text-center text-gray-500">No data found</p>
              )}

              <ToastContainer />
            </div>
          </div>
        </div>
      ) : (
        <ApproveCourse
          courseId={currentCourseId}
          course={course}
          setCourse={setCourse}
          setOpn={setOpn}
        />
      )}
    </div>
  );
}

export default CourseMange;
