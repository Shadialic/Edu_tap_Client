import React, { useEffect, useState } from "react";
import banner from "../../../../public/images/user/home.jpg";
import { LoadCategory } from "../../../api/UserApi";
import editing from "../../../../public/images/user/editing.png";
import course from "../../../../public/images/user/course.png";
import photoshop from "../../../../public/images/user/photoshop.png";
import Instructors from "../../../../public/images/user/Instructors.png";
import view from "../../../../public/images/user/view.jpg";

function AboutPage() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await LoadCategory().then((res) => {
        const data = res.data.categories;
        const filter = data.map((category) => category.categoryName);
        setCategory(filter);
      });
    };
    fetch();
  }, []);
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden ">
        <div className="flex flex-row w-full h-80">
          <div className="w-1/2 sm:content lg:w-1/2 mr-4 p-7 pl-7 mt-16 ml-12 h-[100%] rounded-2xl bg-violet-400 shadow shadow-violet-900">
            <h3 className="text-[#ffffff] ml-2 font-prompt-semibold">
              How is it started
            </h3>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-prompt-lrlight">
              <span className="text-[#ffffff]">
                <span className="text-black"> Our</span> Dream Is
              </span>
              <br />
              <span className="text-[#ffffff] block mt-7 ">
                Global Learning
              </span>
              <span className="text-[#000000] block mt-4 ">Transformation</span>
            </h1>
          </div>
          <div className="flex justify-center w-[60%] h-[100%] p-4 bg-white shadow shadow-violet-700 rounded-2xl mt-16 mr-12">
            <div className="flex justify-center items-center h-full">
              <img className="max-w-full max-h-full" src={banner} alt="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-28">
          <h1 className="text-center mb-10 mt-2 font-prompt text-3xl">
            Explore Categories
          </h1>
          <div className="flex flex-col sm:flex lg:flex-row gap-8">
            <div className="flex flex-wrap justify-center gap-10 ">
              <div className="w-64 h-80 bg-white shadow shadow-violet-700 rounded-2xl">
                <img className="" src={editing} alt="" />

                <h1 className="text-center text-2xl font-prompt-semibold font-prompt mt-7">
                  {category[0]}
                </h1>

                <div className="flex flex-row p-4">
                  <img className="w-4 h-4 mt-1" src={course} alt="" />
                  <p className="ml-1 mb-2 text-base">10 Courses`</p>
                  <img className="w-3 h-4 mt-1 ml-8" src={Instructors} alt="" />
                  <p className=" mb-2 text-base">1 Instructor`</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8  ">
              <div className="w-64 h-80 bg-white shadow shadow-violet-700 rounded-2xl">
                <img
                  className="p-3 pr-4 h-[75%] ml-2 justify-center items-center"
                  src={photoshop}
                  alt=""
                />
                <h1 className="text-center text-2xl font-prompt-semibold font-prompt">
                  {category[1]}
                </h1>
                <div className="flex flex-row p-4">
                  <img className="w-4 h-4 mt-1" src={course} alt="" />
                  <p className="ml-1 mb-2 text-base">10 Courses`</p>
                  <img className="w-3 h-4 mt-1 ml-8" src={Instructors} alt="" />
                  <p className=" mb-2 text-base">1 Instructor`</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-10 ">
              <div className="w-64 h-80 bg-white shadow shadow-violet-700 rounded-2xl">
                <img
                  className="p-3 pr-4 h-[75%] ml-2 justify-center items-center"
                  src={photoshop}
                  alt=""
                />
                <h1 className="text-center text-2xl font-prompt-semibold font-prompt">
                  {category[2]}
                </h1>
                <div className="flex flex-row p-4">
                  <img className="w-4 h-4 mt-1" src={course} alt="" />
                  <p className="ml-1 mb-2 text-base">10 Courses`</p>
                  <img className="w-3 h-4 mt-1 ml-8" src={Instructors} alt="" />
                  <p className=" mb-2 text-base">1 Instructor`</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-1 ">
              <div className="w-64 h-80 bg-white shadow shadow-violet-700 rounded-2xl">
                <img
                  className="p-3 pr-4 h-[75%] ml-2 justify-center items-center"
                  src={photoshop}
                  alt=""
                />
                <h1 className="text-center text-2xl font-prompt-semibold font-prompt">
                  {category[1]}
                </h1>
                <div className="flex flex-row p-4">
                  <img className="w-4 h-4 mt-1" src={course} alt="" />
                  <p className="ml-1 mb-2 text-base">10 Courses`</p>
                  <img className="w-3 h-4 mt-1 ml-8" src={Instructors} alt="" />
                  <p className=" mb-2 text-base">1 Instructor`</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex ml-14">
        <div className="w-[40%]  h-80 bg-gray-200 ">
          <img className="w-full h-full " src={view} alt="" />
        </div>
      </div> */}
      </div>
    </>
  );
}

export default AboutPage;
