import React, { useState, useEffect, useRef } from "react";
import reviewimg from "../../../../public/images/user/reviews.png";
import {
  checkConnection,
  createChat,
  fetchReviews,
  postReview,
} from "../../../api/UserApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Comment from "../Comments/Comment";
import StarRating from "../../Constans/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUnlock,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Constans/Loader/Loader";

function Collections({ chapter, courseId, tutors, course }) {
  const detailsRef = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [review, setReview] = useState("");
  const [tutorData, setTutorData] = useState();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showReview, setShowReiview] = useState([]);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [videoCompletionStatus, setVideoCompletionStatus] = useState(() => {
    const storedStatus = localStorage.getItem("videoCompletionStatus");
    return storedStatus ? JSON.parse(storedStatus) : [];
  });
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const filteredData = chapter.filter((item) => item.course_id === courseId);
    const tutorDetail = course.find((item) => item._id === courseId);
    const tutor = tutors.find((item) => item.email === tutorDetail.auther);
    setTutorData(tutor);
    setData(filteredData);
    if (!localStorage.getItem("videoCompletionStatus")) {
      localStorage.setItem("videoCompletionStatus", JSON.stringify([]));
    }
    const fetch = async () => {
      const response = await fetchReviews();
      const filterdata = response.data.filter(
        (item) => item.courseId === courseId
      );
      const firstId = userInfo.id;
      const secondId = tutor._id;
      const currentchaters = await checkConnection({ firstId, secondId });
      if (currentchaters.data.status === true) {
        setShowMessage(true);
      }
      setShowReiview(filterdata);
    };
    fetch();
  }, [chapter, courseId, review]);

  useEffect(() => {
    checkCourseCompletion();
  }, [videoCompletionStatus]);

  const checkCourseCompletion = () => {
    const allChaptersWatched = videoCompletionStatus.every((status) => status);

    setCourseCompleted(allChaptersWatched);
    if (videoCompletionStatus.length == data.length && data.length != 0) {
      setCertificate(true);
    }
  };

  if (!chapter.length || !data.length) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleVideoClick = (index) => {
    if (index === 0 || videoCompletionStatus[index - 1]) {
      setCount(index);
      setSelectedVideo(index);
      const updatedStatus = [...videoCompletionStatus];
      updatedStatus[index] = true;
      setVideoCompletionStatus(updatedStatus);
      localStorage.setItem(
        "videoCompletionStatus",
        JSON.stringify(updatedStatus)
      );
    } else {
      toast("Please watch the previous video first!");
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleFollowing = async () => {
    const firstId = userInfo.id;
    const secondId = tutorData._id;
    await createChat({ firstId, secondId });
    setShowMessage(true);
  };

  const sendMessage = () => {
    navigate("/chat");
  };

  const handleUnFollowing = () => {
    setShowMessage(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const userName = userInfo.userName;
    const reviewData = {
      review,
      userName,
      currntDate: new Date(),
      courseId,
    };
    await postReview(reviewData);
    setReview("");
  };

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }
  const provideCertificate = () => {
    navigate("/certificate", {
      state: {
        name: userInfo.userName,
        tutorName: tutorData.tutorName,
        course: course,
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex lg:flex-row w-screen h-fit">
      <div className="w-full sm:w-[65%] h-fit p-4">
        <video
          className="w-full h-auto"
          src={
            data.length > 0 && selectedVideo !== null
              ? data[selectedVideo].chapterVideo
              : data.length > 0
              ? data[0].chapterVideo
              : ""
          }
          controls
          autoPlay={true}
        />
        <div>
          <h1 className="font-prompt font-prompt-semibold text-2xl mt-3">
            {data.length > 0 && selectedVideo !== null
              ? data[selectedVideo]?.chapterTitle
              : data.length > 0
              ? data[0]?.chapterTitle
              : "No title available"}
          </h1>
          <div>
            {certificate && (
              <div className="flex flex-row justify-end items-end pr-6 gap-2">
                <button
                  onClick={provideCertificate}
                  className="w-24 text-violet-600 border border-violet-600 font-prompt text-lg h-10"
                >
                  Certificate
                </button>
              </div>
            )}

            <div className="flex flex-row mr-3  mt-7">
              <img className="w-10 h-10" src={tutorData?.image || ""} alt="" />

              <h1 className="font-prompt-semibold ml-3 mt-1 text-xl">
                {tutorData && tutorData.tutorName}
              </h1>

              {!showMessage ? (
                <div className="flex w-24 font-prompt h-10 bg-violet-500 text-white justify-center ml-8 rounded-lg">
                  <button onClick={handleFollowing} className="p-2">
                    follow
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
                    <button onClick={sendMessage} className="p-2">
                      message
                    </button>
                  </div>
                </>
              )}
            </div>

            <h1 className="font-prompt text-sm mt-4">
              {data.length > 0 && selectedVideo !== null
                ? data[selectedVideo]?.chapterDescription
                : data.length > 0
                ? data[0]?.chapterDescription
                : "No description available"}
            </h1>
          </div>
        </div>
        <Comment chapterId={data} userInfo={userInfo} />
      </div>

      <div className="w-full sm:flex flex-col lg:w-[35%] p-4 pr-4">
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
              <div className="sm:text-sm pl-4 font-prompt">
                <h1>{`${index + 1}. ${chapter.chapterTitle}`}</h1>
              </div>
              {videoCompletionStatus[index] ? (
                <FontAwesomeIcon icon={faUnlock} style={{ color: "#B197FC" }} />
              ) : (
                <FontAwesomeIcon icon={faLock} style={{ color: "#B197FC" }} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <StarRating courseId={courseId} userId={userInfo.id} />
        </div>
        <div className="flex flex-col w-[95%] bg-white border-1 shadow-xl">
          <div className="flex flex-row items-center p-4">
            <h1 className="font-prompt">Reviews</h1>
            <img className="w-4 h-4 mt-1 ml-2" src={reviewimg} alt="" />
          </div>
          <div className="flex-1">
            {showReview && showReview.length > 0 ? (
              showReview.map((review, index) => (
                <div key={index} className="w-full mb-2">
                  <div className="border-2 shadow-md border-gray-100 p-4 relative">
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="text-violet-600 cursor-pointer absolute right-2 top-1"
                      onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                      <div className="absolute top-full right-2 mt-1 w-auto font-prompt p-1 bg-white border border-gray-200 rounded shadow-lg">
                        <ul>
                          <li onClick={() => setOpen((cur) => !cur)}>Edit</li>
                        </ul>
                      </div>
                    )}
                    <h1 className="mb-2 font-bold">{review.description}</h1>
                    <div className="flex flex-row items-center text-sm">
                      <span className="mr-2">{review.author}</span>
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-64">
                <h1 className="text-center font-prompt">No reviews yet</h1>
              </div>
            )}
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
      <ToastContainer />
    </div>
  );
}

export default Collections;
