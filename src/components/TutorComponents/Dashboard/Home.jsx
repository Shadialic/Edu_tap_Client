import React, { useState } from "react";
import home_image from "../../../../public/images/tutor/Online world-bro.png";
import bg from "../../../../public/images/tutor/bg-home.jpg";
import Form from "../Add_form/Form";
import { useSelector } from "react-redux";

function Home() {
  const [isOpn, SetOpn] = useState(false);
  const tutor = useSelector((state) => state.tutor.tutorInfo);
  const tutorName = tutor.name;
  const handleCourse = () => {
    SetOpn(true);
  };

  return (
    <div>
      {!isOpn ? (
        <div className="">
          <div className="absolute -z-40">
            <img src={bg} className="w-full h-screen" alt="" />
          </div>
          <div className="w-screen h-screen flex justify-center items-center py-7 px-5 overflow-auto ">
            <div className="bg-white max-w-full sm:max-w-[80%] min-h-[100%] overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5 flex-row">
              <div className="justify-center items-center text-center hidden lg:flex flex-col sm:w-1/2 relative">
                <img
                  src={home_image}
                  className="w-full max-h-full"
                  alt="student-home-image"
                />
              </div>
              <div className="lg:w-1/2 w-full h-full flex flex-col justify-around gap-5 items-center p-3 md:p-8">
                <div className="w-full flex flex-col justify-center items-start">
                  <span className="text-5xl font-bold text-violet-600">
                    Edu-tap
                  </span>
                  <span className="text-4xl font-bold text-primary">
                    Learning
                  </span>
                </div>
                <div className="w-full flex flex-col gap-5 sm:px-10 lg:px-0 items-center">
                  <span className="text-md font-medium text-black">
                    Hi {tutorName}!
                  </span>
                  <span className="text-[14px] text-gray-600 font-prompt">
                    Unleash your teaching spark on Edu-tap. Share your
                    expertise, connect with eager minds, and watch your impact
                    light up screens around the world. Join our vibrant
                    community and build a flexible, fulfilling career, one
                    lesson at a time.
                  </span>
                </div>
                <div className="flex justify-center items-center w-full h-fit ">
                  <button
                    onClick={() => handleCourse()}
                    className="btn-class min-w-[200px] bg-violet-600 text-white font-body rounded-md h-8"
                  >
                    Add Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Form />
      )}
    </div>
  );
}

export default Home;
