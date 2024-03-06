import React from "react";
import Navbar from "../Layouts/Header";

function DetailBLog({ blog, blogId }) {
  const data = blog.find((item) => item._id === blogId);
  return (
    <>
      <Navbar />
      <div className="w-screen flex flex-row justify-center bg-gray-100">
        <div className="sm:bg-white p-4 rounded-lg shadow-lg w-screen lg:flex flex-row">
          <img
            className="w-full h-fit sm:w-[30%] lg:h-auto rounded-lg mr-4"
            src={data.image}
            alt=""
          />
          <div className="sm:flex flex-col w-screen">
            <h1 className="text-lg sm:text-2xl font-prompt-semibold font-prompt mb-2 truncate">
              {data.title}
            </h1>
            <p className="sm:text-gray-600 text-sm mb-4">{data.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailBLog;
