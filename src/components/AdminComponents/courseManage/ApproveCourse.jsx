import React, { useEffect, useState } from "react";
import { manageCourse } from "../../../api/AdminApi";

function ApproveCourse({ courseId, course, setOpn }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const filteredData = course.filter((element) => element._id === courseId);
    setData(filteredData);
  }, [course, courseId]);
  const allowcourse = async (course_id) => {
    await manageCourse({ _id: course_id }).then((res) => {
      setOpn(false);
    });
  };
  const denycourse = async (course_id) => {
    setOpn(false);
  };
  return (
    <>
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center w-screen h-screen py-3 px-3 ">
        <div className="bg-white w-full h-full sm:max-w-[70%] min-h-[85%] overflow-auto rounded-md flex flex-row items-start shadow-xl p-3 gap-5 ml-64 justify-start ">
          {data.map((element) => (
            <div key={element._id} className="mt-4 text-left w-[60%] shadow-sm">
              <h1 className="text-3xl font-bold ml-6 mt-4 mb-6 gap-10">
                {element.title}
              </h1>
              <div className="block font-sans text-base antialiased font-light leading-relaxed text-inherit ml-5">
                <p>{element.description}</p>
              </div>
            </div>
          ))}
          {data.map((element) => (
            <div
              key={element._id}
              className="flex flex-col w-[40%] h-5/6 shadow-lightBlue-800 shadow-lg mt-5 mr-4 p-4 justify-center items-center"
            >
              <div className=" justify-center items-center  w-72 ml-8">
                <img className="w-[85%] h-60" src={element.image} />
              </div>
              <div className="relative text-gradient-to-tr from-lightBlue-950 to-lightBlue-800  shadow-lightBlue-900/20 mt-4 ">
                <h1>
                  Category:{" "}
                  <span className="text-left justify-end">
                    {element.category}
                  </span>
                </h1>
              </div>
              <div className="relative text-gradient-to-tr from-lightBlue-950 to-lightBlue-800  shadow-lightBlue-900/20 ">
                <h1>
                  Price:{" "}
                  <span className="text-left justify-end">{element.price}</span>
                </h1>
              </div>
              <div className="relative text-gradient-to-tr from-lightBlue-950 to-lightBlue-800  shadow-lightBlue-900/20 ">
                <h1>
                  payment:{" "}
                  <span className="text-left justify-end">
                    {element.payment}
                  </span>
                </h1>
              </div>
              <div className="relative text-gradient-to-tr from-lightBlue-950 to-lightBlue-800  shadow-lightBlue-900/20 ">
                <h1>
                  level:{" "}
                  <span className="text-left justify-end">{element.level}</span>
                </h1>
              </div>
              <div className="flex mt-5  items-center gap-6">
                <div className="w-20 h-10 bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 rounded-lg flex items-center justify-center transition duration-300  ">
                  <button
                    onClick={() => denycourse(element._id)}
                    className="text-white hover:bg-gray-500 w-full h-full"
                  >
                    Deny
                  </button>
                </div>
                <div className=" w-20 h-10 bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-gray-900 focus:bg-blue-gray-900">
                  <button
                    onClick={() => allowcourse(element._id)}
                    className="text-white w-full h-full hover:hover:bg-gray-500"
                  >
                    Allow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ApproveCourse;
