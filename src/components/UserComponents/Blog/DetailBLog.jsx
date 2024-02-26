import React from "react";

function DetailBLog({ blog, blogId }) {
  console.log(blogId, "blogIdblogIdblogIdblogIdblogIdblogIdblogIdblogId", blog);
  const data = blog.find((item) => item._id === blogId);
  console.log(data, "data   cfddr");

  return (
    <div className="w-screen flex flex-row justify-center bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-screen flex flex-row">
        <img
          className="w-[30%] h-auto rounded-lg mr-4"
          src={data.image}
          alt=""
        />
        <div className="flex flex-col w-screen">
          <h1 className="text-2xl font-bold mb-2 truncate">{data.title}</h1>
          <p className="text-gray-600 text-sm mb-4">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailBLog;
