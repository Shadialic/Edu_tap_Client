import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import review from "../../../../public/images/user/reviews.png";
import { fetchChapter } from "../../../api/VendorApi";
import RatingStar from "../../Constans/RatingStar/RatingStar";
import { checkout, fetchReviews, purchaseCourse } from "../../../api/UserApi";
import { useNavigate } from "react-router-dom";

function DetailsCourses({ data }) {
  const navigate = useNavigate();
  console.log(data, "popop");
  const [chapter, setChapter] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [payment, setPayment] = useState(false);
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
      const response = await fetchReviews();
      const filterdata = response.data.filter(
        (item) => item.courseId === data._id
      );
      setReviews(filterdata);
      console.log(response.data, "ddddddddddddddddddddddddddddd");
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
      console.log(
        import.meta.env.REACT_APP_PUBLISHABLE_KEY,
        "REACT_APP_PUBLISHABLE_KEY"
      );
      const stripePromise = loadStripe(
        "pk_test_51OjhcBSCmKXJfQ9QbMFSjnnLyfHIFOqYvctxFLrvt3jCVMU6xmHvvHJJr9LA9wVEREoj6zQuzKWNfcjb7zclG47E00rE54fILg"
      );
      const stripe = await stripePromise;
      const result = await checkout(courseid);
      const { clientSecret } = result;
      console.log(clientSecret, "clientSecret");
      // Confirm the PaymentIntent with Stripe
      const { error } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        console.error("Payment failed:", error);
      } else {
        console.log("Payment successful.");
        // Redirect to a success page or handle success flow
      }

      // Confirm the PaymentIntent with Stripe
      // const { error } = await stripe.confirmCardPayment(clientSecret);

      // if (error) {
      //   console.error("Payment failed:", error);
      // } else {
      //   console.log("Payment successful.");
      // Redirect to a success page or handle success flow
      // }
      console.log(result, "989");
    } else {
      await purchaseCourse(courseid, userId).then((res) => {
        navigate("/enrollments");
      });
    }
    console.log(courseid, "lock", userId);
  };
  console.log(reviews, "filterdatafilterdatafilterdatafilterdata");
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

          {data.payment === "price" ? (
            <div className="pl-6 ">
              <button
                onClick={() => activeCourse(data._id)}
                className="w-[34%]  rounded-md h-9 bg-violet-600 font-prompt text-white"
              >
                payment
              </button>
            </div>
          ) : (
            <div className="p-6 ">
              <button
                onClick={() => activeCourse(data._id)}
                className="w-[35%]  rounded-md h-9 bg-violet-600 font-prompt text-white"
              >
                Start
              </button>
            </div>
          )}
        </div>
        <div className=" w-[30%] h-94 bg-white ml-5 border-1 shadow-xl ">
          <div className="flex flex-row">
            <img className="w-4 h-5 mt-5 ml-4" src={review} alt="" />
            <h1 className="font-prompt p-4  pl-2">Reviews</h1>
          </div>
          <div className="">
            {reviews.length > 0 ? (
              <div className="">
                {reviews.map((review, index) => (
                  <div key={index} className="w-[95%] h-[10%]  p-4  font-prompt">
                    <div className=" flex flex-col  border-2 border-gray-100 ">
                      <div className="mb-2">
                        <h1 className="p-2 ">{review.description}</h1>
                        <h1 className="p-2 text-sm">{review.author}</h1>
                        <h1 className="p-2 text-sm">{review.date}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="justify-center font-prompt">No reviews yet</h1>
            )}
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
        <div className="flex w-[50%] flex-col mt-4 overflow-y-scroll">
          <h1 className="text-xl font-prompt text-center">
            Chapters in the Course
          </h1>
          {chapter.map((item, index) => (
            <div key={index} className="flex mt-3 justify-center items-center">
              <div className="flex w-[90%] h-12 shadow-gray-300  rounded-md shadow-md hover:scale-105 hover:shadow-md">
                <h1 className="font-prompt text-center text-gray-500 mt-3 ml-2">
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
