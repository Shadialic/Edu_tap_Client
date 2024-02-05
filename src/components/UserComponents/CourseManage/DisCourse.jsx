import React, { useEffect, useState } from "react";
import { getCourse } from "../../../api/userApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Select, Option } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";
import DetailsCourses from "./DetailsCourses";

function DisCourse() {
  const navigate = useNavigate();
  const [isOpn,setOpn]=useState(false)
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [data, setData] = useState([]);

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
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
    const fetchData = async () => {
      await getCourse().then((res) => {
        const categories = res.data.category;
        const data = res.data.CourseData;
        const filter = data.filter((item) => item.is_varified === "true");
        setCategory(categories);
        setData(filter);
        setCourse(filter);
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
    const detailsCourse=async(id)=>{
      setOpn(true)
  }

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };

  return (
    <>
    {!isOpn?(<div className="flex flex-row">
      <div className="w-[25%] lg:w-2/7 flex flex-col h-full lg:gap-1 mt-3">
        <div className="w-full h-fit flex items-center justify-center bg-white p-3 mt-3 text-3xl font-prompt uppercase tracking-tight text-slate-900">
          category
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
      <div className="flex-col gap-5 w-[75%] h-auto mt-5">
        <div className="text-3xl font-prompt">
          <strong>Explore The Course</strong>
        </div>
        <div className="flex justify-end items-end mr-10">
          <button
            onClick={() => navigate("/enrollments")}
            className="w-[15%] h-10 bg-[#7b229b] text-white shadow-lg rounded-md font-prompt"
          >
            Your Enrollments
          </button>
        </div>
        <h1 className="text-xl  font-prompt ml-4">Most Popular Course</h1>
        <div className="flex-row ml-5  gap-8">
          <Slider
            {...settings}
            className="custom-slick-slider"
            style={{ marginRight: "10px" }}
          >
            {data.map((item) => (
              <div
                className="flex w-[30%] h-36 shadow-md bg-blue-gray-300 border-4 gap-4 ml-4"
                key={item.id}
                style={{ marginRight: "20px" }}
              >
                <div className="flex w-full h-full bg-[#7b229b] justify-center items-center rounded-2xl">
                  <div className="flex flex-col justify-center items-center w-[78%] h-[70%] bg-white rounded-md shadow-md">
                    <p className="ml-2 text-base font-prompt-semibold mb-2">
                      {item.title}
                    </p>
                    <div className="flex flex-col justify-end items-center w-[70%] h-full">
                      <img src={item.image} className="w-24 h-16 " alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="z-10 flex gap-3 relative ml-5">
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
          <div className="border-2 rounded-md overflow-hidden w-full h-10 mt-4 flex font-prompt">
            <input
              className="search w-full h-full px-4 placeholder-gray-500 focus:outline-none"
              type="text"
              placeholder="Search"
              onChange={inputHandler}
            />
          </div>
        </div>
        <div className="flex mb-6">
          {filteredCourses && filteredCourses.length>0? (
            filteredCourses.map((item) => (
              <div onClick={()=>detailsCourse(item._id)}
                className="flex flex-row w-[30%] h-72 border-2 shadow-md shadow-violet-400 rounded-xl ml-6 mt-6 hover:scale-105 hover:shadow-md"
                key={item.id}
              >
                <div className="flex flex-col w-[90%] mx-auto">
                  <div className="flex w-full h-[50%] p-4 bg-white shadow-lg justify-center items-center">
                    <img className="w-full h-full" src={item.image} alt="" />
                  </div>
                  <div className="flex flex-col mt-2">
                    <h1 className="font-prompt text-2xl text-center">
                      {item.title}
                    </h1>
                    <div className="flex flex-row font-prompt ml-4 justify-center items-center mt-3">
                      <label className="uppercase text-md gap-4" htmlFor="">
                        category:
                      </label>
                      <h1 className="font-prompt text-center ml-1">
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
          ) :  (
            <div className="flex w-full">
              <h1 className="font-prompt text-xl  text-center p-20 ml-72 ">Not Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>):(
      <DetailsCourses/>
    )}
    
    </>
  );
}

export default DisCourse;