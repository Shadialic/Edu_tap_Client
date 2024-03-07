import React, { useEffect, useState } from "react";
import { getCourse } from "../../../api/UserApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import DetailsCourses from "./DetailsCourses";
import { Footer } from "../Layouts/Footer";
import { loadOffer } from "../../../api/AdminApi";

function DisCourse() {
  const navigate = useNavigate();
  const [isOpn, setOpn] = useState(false);
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [data, setData] = useState([]);
  const [offer, setOffer] = useState([]);
  const [newOffer, setNewOffer] = useState([]);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleCategoryClick = (clickedCategory) => {
    setSelectedCategory(clickedCategory);
    setSelectedPayment(null);
    setSelectedLevel(null);
  };

  const handleLevelChange = (value) => {
    setSelectedLevel(value);
    setSelectedCategory(null);
  };

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
    setSelectedCategory(null);
  };

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const offers = await loadOffer();
        const newOffer = offers.data.categories;
        setNewOffer(newOffer);
        function filterCoursesByCategory(data, category) {
          if (!data) {
            console.error("Data is undefined");
            return [];
          }
          return data.filter(
            (course) =>
              course.category === category && course.payment === "price"
          );
        }
        const filteredCourses = newOffer.map((category) => {
          const courses = filterCoursesByCategory(
            offers.data.courses,
            category
          );
          return courses;
        });
        setOffer(filteredCourses.flat());
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchAndFilter();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getCourse().then((res) => {
        const categories = res.data.category;
        const data = res.data.CourseData;
        const filter = data.filter((item) => item.is_varified === "true");
        setCategory(categories);
        setData(filter);
      });
    };
    fetchData();
  }, []);

  const filteredCourses = data
    .filter((item) => !selectedCategory || item.category === selectedCategory)
    .filter((item) => !selectedPayment || item.payment === selectedPayment)
    .filter((item) => !selectedLevel || item.level === selectedLevel)
    .filter(
      (item) => !inputText || item.title.toLowerCase().includes(inputText)
    );

  const detailsCourse = async (id) => {
    const filter = data.find((item) => item._id === id);
    setCourse(filter);
    setOpn(true);
  };
  //Fetch Offers
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const settings = {
    infinite: true,
    slidesToShow: isMobile ? 2 : 3,

    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };

  return (
    <>
      {!isOpn ? (
        <div className="flex flex-col sm:flex lg:flex-row">
          {!showCategoryMenu && (
            <div className="lg:hidden w-full flex flex-col h-full justify-center items-center lg:gap-1 mt-3">
              <div className="w-full h-fit flex items-center justify-center bg-white p-3 mt-3 text-3xl font-prompt uppercase tracking-tight text-slate-900">
                Category
              </div>
              <div className="w-full h-full flex flex-col items-center overflow-y-auto px-5">
                {category.map((item) => (
                  <div
                    key={item.id}
                    className="my-2 text-[14px] p-1 w-full justify-center flex transition duration-500 hover:scale-105 cursor-pointer font-prompt border-gray hover:shadow-lg hover:text-violet-600"
                    onClick={() => handleCategoryClick(item.categoryName)}
                  >
                    <p>{item.categoryName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => setShowCategoryMenu((prev) => !prev)}
            className="lg:hidden my-2 text-[14px] p-1 w-full justify-center flex transition duration-500 hover:scale-105 cursor-pointer font-prompt border-gray hover:shadow-lg hover:text-violet-600"
          >
            {showCategoryMenu ? "Show Categories" : "Hide Categories"}
          </button>
          <div className=" hidden sm:w-[25%] lg:w-2/7 lg:flex flex-col h-full lg:gap-1 mt-3">
            <div className="w-full h-fit flex items-center justify-center bg-white p-3 mt-3 text-3xl font-prompt uppercase tracking-tight text-slate-900">
              Category
            </div>
            <div className="w-full h-full flex flex-col items-center overflow-y-auto px-5">
              {category.map((item) => (
                <div
                  key={item.id}
                  className="my-2 text-[14px] p-1 w-full justify-center flex transition duration-500 hover:scale-105 cursor-pointer font-prompt border-gray hover:shadow-lg hover:text-violet-600"
                  onClick={() => handleCategoryClick(item.categoryName)}
                >
                  <p>{item.categoryName}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full sm:flex-col gap-5 lg:w-[75%] h-auto mt-5">
            <div className="text-xl pl-2 sm:text-3xl font-prompt">
              <strong>Explore The Course</strong>
            </div>
            <div className="flex justify-end  sm:flex lg:justify-end items-end mr-10">
              <button
                onClick={() => navigate("/enrollments")}
                className="sm:w-[15%] h-10 bg-violet-600 text-white shadow-lg rounded-md font-prompt"
              >
                Your Enrollments
              </button>
            </div>
            <h1 className="text-xl  font-prompt ml-4">Most Popular Course</h1>
            <div className="flex-row ml-5  gap-8 ">
              <Slider
                {...settings}
                className="custom-slick-slider"
                style={{ marginRight: "10px" }}
              >
                {data.map((item) => (
                  <div
                    className="flex w-[30%] h-44 shadow-md  gap-4 ml-4"
                    key={item.id}
                    style={{ marginRight: "20px" }}
                  >
                    <div className="flex w-full h-full bg-gray-100  justify-center items-center ">
                      <div className="flex flex-col justify-center items-center w-[90%] h-[80%] bg-white rounded-md shadow-md">
                        <p className="text-md sm:ml-2 text-base font-prompt-semibold font-prompt  mb-3 mt-2 pt-2">
                          {item.title}
                        </p>
                        <div className="flex flex-col justify-end items-center w-[70%] h-full">
                          <img
                            src={item.image}
                            className="w-32 h-24  mb-6"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="z-10 flex gap-3 relative ml-5 flex-col sm:flex-row">
              <div className="flex w-48 flex-col gap-3 mt-4 font-prompt z-10">
                <Select
                  color="purple"
                  label="Payment"
                  onChange={(value) => handlePaymentChange(value)}
                  value={selectedPayment}
                >
                  <Option>Free + Premium</Option>
                  <Option value="free">Free</Option>
                  <Option value="price">Premium</Option>
                </Select>
              </div>
              <div className="flex w-48 flex-col gap-3 mt-4 font-prompt z-10">
                <Select
                  color="purple"
                  label="Select a Level"
                  onChange={(value) => handleLevelChange(value)}
                  value={selectedLevel}
                >
                  <Option value="">All</Option>
                  <Option value="beginner">Beginner</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Advanced">Advanced</Option>
                </Select>
              </div>
              <div className="border-2 rounded-md overflow-hidden lg:w-full h-10 mt-4 flex font-prompt sm:w-auto">
                <input
                  className="search w-full h-full px-4 placeholder-gray-500 focus:outline-none"
                  type="text"
                  placeholder="Search"
                  onChange={inputHandler}
                />
              </div>
            </div>

            <div className="flex   justify-center items-center sm:flex flex-wrap mb-6">
              {filteredCourses && filteredCourses.length > 0 ? (
                filteredCourses.map((item, index) => (
                  <div
                    onClick={() => detailsCourse(item._id)}
                    className="w-[90%] flex justify-center  sm:flex flex-row lg:w-[30%] md:w-[45%] md:ml-2 h-72 border-2 shadow shadow-violet-700 rounded-xl lg:ml-6 mt-8 hover:scale-105 hover:shadow-md"
                    key={item.id}
                  >
                    <div className="mx-auto sm:flex flex-col w-[90%] lg:mx-auto">
                      <div className="sm:flex w-full h-[55%] p-4 bg-white shadow-lg justify-center items-center">
                        <img
                          className="w-full h-full"
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col mt-2">
                        <h1 className="font-prompt text-2xl text-center">
                          {item.title}
                        </h1>
                        <div className="flex flex-row font-prompt ml-4 justify-center items-center mt-3">
                          <label className="uppercase text-sm gap-4" htmlFor="">
                            category:
                          </label>
                          <h1 className="font-prompt text-center text-sm ml-1 pb-1">
                            {item.category}
                          </h1>
                        </div>

                        <h1 className="font-prompt text-lg text-center mt-3">
                          {item.payment}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex w-full">
                  <h1 className="ml-36 font-prompt sm:font-prompt text-xl  text-center p-20 lg:ml-72 ">
                    Not Found
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <DetailsCourses data={course} offer={offer} newOffer={newOffer} />
      )}
      <Footer />
    </>
  );
}

export default DisCourse;
