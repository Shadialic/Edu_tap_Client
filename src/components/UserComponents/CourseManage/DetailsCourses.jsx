import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import review from "../../../../public/images/user/reviews.png";
import { fetchChapter } from "../../../api/VendorApi";
import RatingStar from "../../Constans/RatingStar/RatingStar";
import { purchaseCourse } from "../../../api/UserApi";
import { useNavigate } from "react-router-dom";

function DetailsCourses({ data }) {
  const navigate=useNavigate();
  console.log(data, "popop");
  const [chapter, setChapter] = useState([]);
  const [payment, setPayment] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      await fetchChapter().then((res) => {
        const updateData = res.data.data;
        console.log(data._id, "ppp");
        const filterData = updateData.filter(
          (item) => item.course_id === data._id
        );
        console.log(filterData, "filterData");
        setChapter(filterData);
        console.log(res, "slsls");
      });
    };
    fetch();
  }, []);
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = userInfo.id;
  console.log(userInfo, "userInfo");

  console.log(tutorInfo, "p999pp");
  const handleRating = (rate) => {
    console.log(rate);
  };
  const activeCourse = async (courseid) => {
    if (data.payment === "price") {
      setPayment(true);
    } else {
      await purchaseCourse(courseid, userId).then((res) => {
        navigate('/enrollments')
      });
    }
    console.log(courseid, "lock", userId);
  };

  return (
    <>
      <div className="flex flex-row w-screen h-full p-4">
        <div className="w-[70%] h-[60%] bg-white shadow-lg p-5 border-1">
          <div className="flex flex-row w-14 h-10 bg-red p-3">
            <button className="flex flex-row w-10 h-6 bg-violet-600 font-prompt text-md text-white rounded-lg text-center pl-1">
              {data.payment} <span className="ml-3 text-black">Course</span>
            </button>
          </div>
          <div className="mt-3 pl-4">
            <h1 className="text-3xl font-prompt-semibold">{data.title}</h1>
            <p className="font-prompt p-2">{data.description}</p>
          </div>
          <div className="flex flex-row pl-8 mt-4">
            <img className="w-8 h-8" src={tutorInfo.image} alt="" />
            <h1 className="font-prompt text-lg ml-2">{tutorInfo.name}</h1>
          </div>
          <RatingStar />
          <div className="p-6 ">
            <button
              onClick={() => activeCourse(data._id)}
              className="w-[35%]  rounded-md h-9 bg-violet-600 font-prompt text-white"
            >
              Start
            </button>
          </div>
          {payment ? (
            <div className="pl-6 ">
              <button
                onClick={() => activeCourse(data._id)}
                className="w-[34%]  rounded-md h-9 bg-violet-600 font-prompt text-white"
              >
                payment
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-row w-[28%] h-94 bg-white ml-5 border-1 shadow-xl ">
          <h1 className="font-prompt p-4">Reviews</h1>
          <img className="w-4 h-4 mt-5 mr-2" src={review} alt="" />
          <div className="flex items-center justify-center">
            <h1 className="justify-center font-prompt">No reviews yet</h1>
          </div>
        </div>
      </div>
      <div className="flex p-4 w-[98%] h-20 border-2 border-gray-100 ml-4 justify-around">
        <div className="flex flex-col pr-4 ">
          <h1>Skill Level</h1>
          <h1 className="uppercase font-prompt font-prompt-semibold">
            {data.level}
          </h1>
        </div>
        <div className="flex flex-col justify-center ">
          <h1 className="justify-center">Duration</h1>
          <h1 className="uppercase font-prompt font-prompt-semibold">
            {chapter.length} Chapter
          </h1>
        </div>
        <div className="flex flex-col justify-center ">
          <h1 className="justify-center">Category</h1>
          <h1 className="uppercase font-prompt font-prompt-semibold">
            {data.category}
          </h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="relative w-[50%] h-fit p-5">
          {chapter.length > 0 && chapter[0].demoVideo && (
            <video
              className="w-full h-auto"
              src={chapter[0].demoVideo}
              controls
              autoPlay={true}
            />
          )}
        </div>
        <div className="flex w-[50%] flex-col mt-3 overflow-y-scroll">
          <h1 className="text-2xl font-prompt text-center">chapters</h1>
          {chapter.map((item, index) => (
            <div key={index} className="flex mt-3 justify-center items-center">
              <div className="flex w-[90%] h-12 border-2 border-violet-100 rounded-md bg-gray-500">
                <h1 className="font-prompt text-center text-white mt-3 ml-2">
                  #{index + 1} {item.chapterTitle}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailsCourses;
