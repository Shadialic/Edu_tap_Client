import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FaStripe } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { TimeMange } from "../../../helpers/TimeMange";
import LoadStripe from "../../Payment/LoadStripe";
import review from "../../../../public/images/user/reviews.png";
import {
  checkout,
  fetchReviews,
  getUserCourseRating,
  purchaseCourse,
} from "../../../api/UserApi";
import { useNavigate } from "react-router-dom";
import { LoadTutorList } from "../../../api/AdminApi";
import { fetchChapter } from "../../../api/VendorApi";
import { Loader } from "../../Constans/Loader/Loader";

const StripePromise = await loadStripe(
  import.meta.env.VITE_REACT_APP_PUBLISHABLE_KEY
);

function DetailsCourses({ data, offer, newOffer }) {
  const navigate = useNavigate();
  const [chapter, setChapter] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [auther, setAuther] = useState();
  const [clientSecret, setClientSecret] = useState(null);
  const [rating, setRating] = useState(null);
  const [bugs, setBugs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Discount, setDiscount] = useState();

  useEffect(() => {
    const fetch = async () => {
      await fetchChapter().then((res) => {
        const updateData = res.data.data;
        const filterData = updateData.filter(
          (item) => item.course_id === data._id
        );
        setChapter(filterData);
      });

      // Fetch tutor data
      await LoadTutorList().then((res) => {
        const auther = res.data.tutordata;
        const tutorData = auther.find((item) => item.email === data.auther);
        setAuther(tutorData);
      });

      // Fetch reviews
      const response = await fetchReviews();
      const filterdata = response.data.filter(
        (item) => item.courseId === data._id
      );
      setReviews(filterdata);

      // Fetch user course rating
      const currentrating = await getUserCourseRating(data._id);
      const courseRating = currentrating.data.rating;
      setRating(parseFloat(courseRating.totelrating));
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const dis = newOffer.find(
      (item) => item.category === data.category && data.payment === "price"
    );
    setDiscount(dis);
  }, []);

  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = userInfo.id;

  useEffect(() => {
    const fetch = async () => {
      if (data.payment === "price") {
        const result = await checkout(data._id);
        setClientSecret(result.clientSecret);
        setBugs(data.price);
      }
    };
    fetch();
  }, []);
  const activeCourse = async (courseId) => {
    await purchaseCourse(courseId, userId).then((res) => {
      navigate("/enrollments");
    });
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex lg:flex-row w-screen h-full p-4 overflow-x-hidden">
            <div className="w-full sm:w-[70%] h-[60%] bg-white shadow-lg p-5 border-1">
              <div className="flex flex-row w-14 h-10 bg-red p-3">
                <button className="flex flex-row w-10 h-6 bg-violet-600 font-prompt text-md text-white rounded-lg text-center pl-1">
                  {data.payment} <span className="ml-3 text-black">Course</span>
                </button>
              </div>
              <div className="mt-3 pl-4">
                <h1 className="text-3xl font-prompt-semibold">{data.title}</h1>
                <p className="font-prompt p-2">{data.description}</p>
              </div>
              <div className="flex flex-row mt-2 gap-2">
                <span className="font-prompt pl-6 ">{rating}</span>
                <div className="text-lg">
                  <Rating
                    sx={{
                      fontSize: "18px",
                      "& .MuiRating-iconFilled": {
                        fontSize: "18px",
                      },
                      "& .MuiRating-iconEmpty": {
                        fontSize: "18px",
                      },
                      flex: "0 0 auto",
                    }}
                    className="pt-1 text-lg"
                    value={rating}
                    precision={0.5}
                    emptyIcon={
                      <StarIcon
                        style={{ fontSize: "20px", opacity: 0.55 }}
                        className="star-icon"
                      />
                    }
                  />
                </div>
              </div>
              <div className="flex flex-row pl-5 mt-4">
                <img className="w-7 h-7" src={auther && auther.image} alt="" />
                <h1 className="font-prompt text-lg ml-2">
                  {auther && auther.tutorName}
                </h1>
              </div>
              {Discount && (
                <h1 className="text-[15px] font-prompt ml-5 mt-3">
                  Discount {Discount.Percentage}%
                </h1>
              )}

              {data.payment === "price" && clientSecret && clientSecret && (
                <div style={{ cursor: "pointer" }}>
                  <FaStripe
                    className=" ml-[40%] text-white"
                    style={{ width: "30px", height: "39px" }}
                  />
                  <Elements stripe={StripePromise} options={options}>
                    <LoadStripe
                      bugs={bugs}
                      newOffer={Discount && Discount.Percentage}
                      clientSecret={clientSecret}
                      userId={userInfo.email}
                      tutorId={auther.email}
                      courseId={data._id}
                      courseName={data.title}
                    />
                  </Elements>
                </div>
              )}

              {data.payment !== "price" && (
                <div className="p-6">
                  <button
                    onClick={() => activeCourse(data._id)}
                    className="w-[35%] rounded-md h-9 bg-violet-600 font-prompt text-white"
                  >
                    Start
                  </button>
                </div>
              )}
            </div>
            <div className=" w-full sm:w-[30%] h-94 bg-white ml-5 border-1 shadow-xl  ">
              <div className="flex flex-row">
                <img className="w-4 h-5 mt-5 ml-4" src={review} alt="" />
                <h1 className="font-prompt p-4 pl-2">Reviews</h1>
              </div>
              {reviews.length > 0 ? (
                <div className="">
                  {reviews &&
                    reviews.map((review, index) => (
                      <div
                        key={index}
                        className="w-[95%] h-[10%] p-1 pl-3 font-prompt"
                      >
                        <div className="flex flex-col border-2 border-gray-100">
                          <div className="mb-2">
                            <h1 className="p-2">{review.description}</h1>
                            <div className="flex flex-row items-center">
                              <h1 className="p-2 text-sm">{review.author}</h1>
                              <h1 className="p-2 text-sm left-2">
                                {" "}
                                {TimeMange(review.date) == "NaN years ago"
                                  ? "just now"
                                  : TimeMange(review.date)}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <h1 className="flex justify-center font-prompt">
                  No reviews yet
                </h1>
              )}
            </div>
          </div>
          <div className="flex p-4 w-[98%] h-20 border-2 border-gray-100 ml-4 justify-around">
            <div className="flex flex-col pr-4 ">
              <h1>Skill Level</h1>
              <h1 className="text-[14px] sm:uppercase font-prompt font-prompt-semibold ">
                {data.level}
              </h1>
            </div>
            <div className="flex flex-col justify-center ">
              <h1 className="justify-center">Duration</h1>
              <h1 className="text-[14px] sm:uppercase font-prompt font-prompt-semibold">
                {chapter.length} Chapter
              </h1>
            </div>
            <div className="flex flex-col justify-center ">
              <h1 className="justify-center">Category</h1>
              <h1 className="text-[14px] sm:uppercase font-prompt font-prompt-semibold">
                {data.category}
              </h1>
            </div>
          </div>
          <div className="sm:flex flex-row">
            <div className=" w-full sm:relative lg:w-[50%] h-fit p-5">
              {chapter.length > 0 && chapter[0].demoVideo && (
                <video
                  className="w-full h-auto"
                  src={chapter[0].demoVideo}
                  controls
                  autoPlay={true}
                />
              )}
            </div>
            <div className="w-full sm:flex lg:w-[50%] flex-col mt-4 overflow-y-scroll">
              <h1 className="text-xl font-prompt text-center">
                Chapters in the Course
              </h1>
              {chapter.map((item, index) => (
                <div
                  key={index}
                  className="flex mt-3 justify-center items-center"
                >
                  <div className="flex w-[90%] h-12 shadow-gray-300  rounded-md shadow-md hover:scale-105 hover:shadow-md">
                    <h1 className="text-[14px] font-prompt  sm:font-prompt text-center text-gray-500 mt-3 ml-2">
                      #{index + 1} {item.chapterTitle}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DetailsCourses;
