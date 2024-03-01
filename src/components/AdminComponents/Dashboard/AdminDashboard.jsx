import React from "react";

function AdminDashboard() {
  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 p-4 xl:ml-80">
        <div className="bg-clip-border rounded-xl  bg-gradient-to-tr from-lightBlue-950 to-lightBlue-800 text-white shadow-lightBlue-900/20 shadow-lgw-[95%] h-auto">
          <div className="p-6">

          <h1 className="font-prompt font-prompt-semibold p">Hello Admin</h1>
          <h1 className="font-prompt ">Welcome To Dashboard</h1>
          <p className="">Congratulation ,You have some good news</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="w-[23%]  h-40 bg-white shadow-lg shadow-gray-200 flex justify-center items-center ">
            <h1 className="pb-10 font-prompt uppercase">Totel Users</h1>
          </div>
          <div className="w-[23%]  h-40 bg-white shadow-lg shadow-gray-200 "></div>
          <div className="w-[23%]  h-40 bg-white shadow-lg shadow-gray-200 "></div>
          <div className="w-[23%]  h-40 bg-white shadow-lg shadow-gray-200 "></div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
