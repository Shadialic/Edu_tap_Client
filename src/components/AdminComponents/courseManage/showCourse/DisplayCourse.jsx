import React, { useEffect, useState } from "react";
import DetailesCourse from "./DetailesCourse";

function DisplayCourse({ userDatas }) {
  const [course, setCourse] = useState([]);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [isOpn, setOpn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterData = userDatas.filter(
          (item) => item.is_varified === "true"
        );
        setCourse(filterData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchData();
  }, [userDatas]);

  const handleCourse = (course_id) => {
    setCurrentCourseId(course_id);
    setOpn(true);
  };
  return (
    <>
      {!isOpn ? (
        <div className="flex flex-wrap gap-16">
          {course.map((item) => (
            <div
              key={item.id}
              className="relative flex mb-6 flex-col text-gray-700 bg-white shadow-lg shadow-lightBlue-800 rounded-xl w-64 max-h-80 justify-center items-center duration-200 transform hover:scale-105 hover:shadow-md"
            >
              <div
                onClick={() => handleCourse(item._id)}
                className="mx-4 mb-6 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-60 w-[75%]"
              >
                <img
                  src={item.image}
                  alt="profile-picture"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {item.title}
                </h4>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                  {item.category}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                  {item.payment}
                </p>
              </div>
              <div className="flex justify-center p-6 pt-2 gap-7">
                <a
                  href="#facebook"
                  className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
                >
                  <i className="fab fa-facebook" aria-hidden="true"></i>
                </a>
                <a
                  href="#twitter"
                  className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400"
                >
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a
                  href="#instagram"
                  className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400"
                >
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DetailesCourse
          courseId={currentCourseId}
          course={course}
          setCourse={setCourse}
          setOpn={setOpn}
        />
      )}
    </>
  );
}

export default DisplayCourse;
