import React, { useState, useEffect } from "react";
import reviewimg from "../../../../public/images/user/reviews.png";
import RatingStar from "../../Constans/RatingStar/RatingStar";
import { createChat, postReview } from "../../../api/UserApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Collections({ chapter, courseId, tutors, course }) {
  const navigate=useNavigate()
  console.log(chapter, "lll", tutors);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [review, setReview] = useState("");
  const [tutorData, setTutorData] = useState();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo, "userInfo");
  useEffect(() => {
    const filteredData = chapter.filter((item) => item.course_id === courseId);
    const tutorDetail = course.find((item) => item._id === courseId);
    const tutor = tutors.find((item) => item.email === tutorDetail.auther);
    setTutorData(tutor);

    setData(filteredData);
  }, [chapter, courseId]);

  console.log(data, "pppppppp[p");

  if (!chapter.length || !data.length) {
    return <div>No data available</div>;
  }

  const handleVideoClick = (index) => {
    setCount(index);
    setSelectedVideo(index);
  };
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  const handleFollowing = async () => {
   const firstId=userInfo.id;
   const secondId=tutorData._id
   console.log(secondId,'secondId');
    const response=await createChat({firstId,secondId})
    console.log(response,'----------------');
    setShowMessage(true);
  };
  const sendMessage=()=>{
    navigate('/chat')
  }
  const handleUnFollowing = () => {
    setShowMessage(false);
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const userName = userInfo.userName;
    console.log(userName, "tutorName");
    const reviewData = {
      review,
      userName,
      currntDate: new Date(),
      courseId,
    };
    console.log(reviewData, "reviewData");
    await postReview(reviewData);
  };

  return (
    <div className="flex flex-row w-screen h-fit">
      {/* Video Player */}
      <div className="w-[65%] h-fit p-4">
        <video
          className="w-full h-auto"
          src={
            selectedVideo !== null
              ? data[selectedVideo].chapterVideo
              : data[0].chapterVideo
          }
          controls
          autoPlay={true}
        />
        <div>
          <h1 className="font-prompt font-prompt-semibold text-2xl mt-3">
            {selectedVideo !== null
              ? data[selectedVideo].chapterTitle
              : data[0].chapterTitle}
          </h1>
          <div>
            <div className="flex flex-row mr-3  mt-7">
              <img className="w-10 h-10 " src={tutorData.image} alt="" />
              <h1 className="font-prompt-semibold ml-3 mt-1 text-xl">
                {tutorData.tutorName}
              </h1>
              {!showMessage ? (
                <div className="flex w-24 font-prompt h-10 bg-violet-500 text-white justify-center ml-8 rounded-lg">
                  <button onClick={handleFollowing} className="p-2">
                    following
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex w-24 font-prompt h-10 bg-violet-500 text-white justify-center ml-8 rounded-lg">
                    <button onClick={handleUnFollowing} className="p-2">
                      followed
                    </button>
                  </div>
                  <div className="flex w-24 font-prompt h-10 bg-violet-500 text-white justify-center ml-2 rounded-lg">
                    <button onClick={sendMessage} className="p-2">message</button>
                  </div>
                </>
              )}
            </div>
            <h1 className="font-prompt text-sm mt-4">
              {" "}
              {selectedVideo !== null
                ? data[selectedVideo].chapterDescription
                : data[0].chapterDescription}
            </h1>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="flex flex-col w-[35%] p-4 pr-4">
        <div className="w-[95%] h-10 border-2 border-gray-100 font-prompt p-1">
          <span className="mb-2 text-sm">
            {count + 1}
            <span className="text-xl">/</span>
            {data.length}
          </span>
          <span className="ml-2">Chapters</span>
        </div>
        <div className="w-[95%] h-auto border-2 mt-4">
          {data.map((chapter, index) => (
            <div
              className="flex flex-row p-5"
              key={index}
              onClick={() => handleVideoClick(index)}
            >
              <video
                className="w-[30%] h-fit"
                src={chapter.chapterVideo}
                controls
              />
              <div className="text-sm pl-4 font-prompt">
                <h1>{`${index + 1}. ${chapter.chapterTitle}`}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <RatingStar />
        </div>
        <div className="flex flex-row w-[95%] h-48 bg-white  border-1 shadow-xl ">
          <h1 className="font-prompt p-4">Reviews</h1>
          <img className="w-4 h-4 mt-5 mr-1" src={reviewimg} alt="" />
          <div className="flex items-center justify-ceter">
            <h1 className=" text-center font-prompt mt-6 ml-10">
              No reviews yet
            </h1>
          </div>
        </div>
        <div className="mt-4">
          <textarea
            className="w-[95%] border-none border-gray-300 font-prompt border-2 shadow-xl shadow-gray-300 p-2"
            name="reviews"
            id=""
            cols="30"
            rows="10"
            placeholder="your review"
            value={review}
            onChange={handleReviewChange}
          ></textarea>
          <div className="mt-3">
            <button
              onClick={handleReviewSubmit}
              className="w-[95%] h-10 bg-violet-600 font-prompt text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
