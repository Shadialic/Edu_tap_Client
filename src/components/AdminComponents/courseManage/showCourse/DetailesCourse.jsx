import React, { useEffect, useState } from "react";
import { BlockingCourse } from "../../../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DetailesCourse({ courseId, course, setOpn }) {
  const [data, setData] = useState([]);
  const [block, setBlock] = useState(false);
  useEffect(() => {
    const filteredData = course.filter((element) => element._id === courseId);
    setData(filteredData);
    if (filteredData.is_Block == "true") {
      setBlock(false);
    } else {
      setBlock(true);
    }
  }, [course, courseId]);

  const handleBlock = async (course_id) => {
    const response = await BlockingCourse({ _id: course_id });
    toast(response.data.alert);
    setBlock(true);
  };
  const handleUnBlock = async (course_id) => {
    const response = await BlockingCourse({ _id: course_id });
    toast(response.data.alert);
    setBlock(false);
  };

  return (
    <>
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center w-full h-auto py-3 px-3">
        <div className="bg-white w-full h-full sm:max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl min-h-[85%] overflow-auto rounded-md flex flex-col md:flex-row items-start shadow-xl p-3 gap-5 justify-start">
          {data.map((element) => (
            <div
              key={element._id}
              className="text-left w-full md:w-[60%] shadow-sm mt-4"
            >
              <h1 className="text-3xl font-bold ml-6 mt-4 mb-6 gap-10">
                {element.title}
              </h1>
              <div className="block font-sans text-base antialiased font-light leading-relaxed text-inherit ml-5">
                <p>{element.description}</p>
              </div>

              <div className="flex flex-row p-4">
                <label className="text-xl font-prompt-semibold" htmlFor="">
                  auther:
                </label>
                <h1 className="text-lg font-prompt ml-1 mt-1">
                  {element.auther}
                </h1>
                <img src="" alt="" />
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
                {!block ? (
                  <div className="w-20 h-10 bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 rounded-lg flex items-center justify-center transition duration-300  ">
                    <button onClick={() => handleBlock(element._id)}>
                      Block
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-10 bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 rounded-lg flex items-center justify-center transition duration-300  ">
                    <button onClick={() => handleUnBlock(element._id)}>
                      UnBlock
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DetailesCourse;
