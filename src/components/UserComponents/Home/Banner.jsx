import React, { useEffect, useState } from "react";
import { LoadCourse } from "../../../api/AdminApi";
import Slider from "react-slick";
import banner from "../../../../public/images/user/banner.jpg";
function Banner() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await LoadCourse();
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="bg-[#fbfaff] ">
        <h1 className="p-7 font-prompt font-prompt-semibold text-2xl">
          Most Popular Courses
        </h1>
        <div className="flex-row ml-6 ">
          <Slider
            {...settings}
            className="custom-slick-slider p-2"
            style={{ marginRight: "10px" }}
          >
            {course.map((item) => (
              <div key={item.id}>
                <img className="w-44 h-44" src={item.image} alt="" />
                <h1 className="font-prompt text-lg">{item.title}</h1>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="flex flex-row w-full h-94 bg-[rgb(255,255,255)]  justify-center items-center pl-8 ">
        <div className="flex w-[55%] h-full font-prompt p-4 align-middle ">
          Choosing the best e-learning platform depends on various factors such
          as the specific requirements of your organization or target audience,
          your budget constraints, and the features you prioritize. Moodle
          stands out as a robust open-source option, offering extensive
          customization and a strong community of developers. Alternatively,
          Canvas provides a user-friendly interface and comprehensive tools,
          while platforms like Udemy and Coursera offer vast libraries of
          pre-made courses. Ultimately, the best platform for you will align
          with your objectives, technical capabilities, and the learning
          experience you aim to deliver.
        </div>
        <div className="flex w-[45%] h-full justify-center  pr-6">
          <img className="h-80 " src={banner} alt="" />
        </div>
      </div>
    </>
  );
}

export default Banner;
