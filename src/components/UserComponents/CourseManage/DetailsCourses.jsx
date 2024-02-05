import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import review from "../../../../public/images/user/reviews.png";

function DetailsCourses({ data }) {
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);

  const handleRating = (rate) => {
    // Handle logic for the rating
    console.log(rate);
  };

  return (
    <>
    <div className="flex flex-row w-screen h-full p-5">
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
        {/* <div className="flex flex-row">
  <Rating
    ratingValue={0}
    size={20}
    className=""
    transition
    fillColor="gold"
    emptyColor="gray"
    onClick={handleRating}
  />
</div> */}
        <div className="p-6 ">
          <button className="w-[35%] rounded-md h-9 bg-violet-600 font-prompt text-white">
            Start
          </button>
        </div>
      </div>
      <div className="flex flex-row w-[28%] h-94 bg-white ml-5 border-1 shadow-xl">
        <h1 className="font-prompt p-4">Reviews</h1>
        <img className="w-4 h-4 mt-5 mr-2" src={review} alt="" />
      </div>
    </div>
    <div className="flex p-4 w-[95%] h-20 border-2  ml-6 border-gray-100">
      <div className="ml-20 ">
        <h1>Skill Level</h1>
        <h1 className="uppercase font-prompt font-prompt-semibold">{data.level}</h1>
      </div>
      <div className="justify-center items-center  ml-96 ">
        <h1 className="">Duration</h1>
        <h1 className="uppercase font-prompt font-prompt-semibold">6 Chapter</h1>
      </div>
      {/* <div className="justify-center items-end text-end gap-10 ">
        <h1 className="text-end">Categoty</h1>
        <h1 className="uppercase font-prompt font-prompt-semibold">{data.category}</h1>
      </div> */}
    </div>

    </>
  );
}

export default DetailsCourses;
