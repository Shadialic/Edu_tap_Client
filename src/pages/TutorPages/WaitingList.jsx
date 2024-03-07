import React, { useEffect, useState } from "react";
import empty from "../../../public/images/tutor/noData.png";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCoures, manageCourse } from "../../api/VendorApi";
import { Loader } from "../../components/Constans/Loader/Loader";

function WaitingList() {
  const tutor = useSelector((state) => state.tutor.tutorInfo);
  const tutorMail = tutor.email;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCoures({ auther: tutorMail });
        const updateData = res.data.course;
        const filterData = updateData.filter(
          (item) => item.is_varified === "false"
        );
        setData(filterData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const canceldata = async (id) => {
    await manageCourse(id).then((res) => {
      toast(res.data.alert);
    });
  };

  const handleCourse = (course) => {
    console.log(`Clicked on course with ID: ${course._id}`);
  };

  return (
    <div>
      <div className="flex ml-10">
        <h1 className="font-prompt text-3xl">Waiting List</h1>
      </div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : data && data.length > 0 ? (
        <div className="flex flex-wrap gap-16 p-9">
          {data.map((course) => (
            <div
              key={course._id}
              className="relative flex mb-6 flex-col text-gray-700 bg-white shadow-md shadow-[#8a51abf1] rounded-xl w-64 max-h-80 justify-center items-center transition-property: box-shadow;
              transition-duration: 150ms duration-200 transform hover:scale-105 hover:shadow-md"
            >
              <div
                onClick={() => handleCourse(course)}
                className=" overflow-hidden text-gray-700 bg-white shadow-lg  rounded-xl  w-[75%]"
              >
                <img
                  src={course.image}
                  alt="profile-picture"
                  className="w-full h-40 p-6"
                />
              </div>
              <div className="flex flex-col  text-center mt-2">
                <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {course.title}
                </h4>
                <p className="block font-sans  text-base  font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                  {course.category}
                </p>
                <p className="block font-sans text-base mb-4  font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                  * {course.payment}
                </p>
              </div>
              <div className="flex w-[50%] h-[15%] bg-red-800 justify-center items-center mb-4 rounded-md text-white">
                <button
                  onClick={() => canceldata(course._id)}
                  className="font-prompt justify-center items-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src={empty} className="w-[40%] h-[30%]" alt="" />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default WaitingList;
