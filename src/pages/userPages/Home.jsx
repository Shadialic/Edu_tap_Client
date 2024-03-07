import React, { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader"; // Import FadeLoader
import meta from "../../assets/images/home.jpeg";
import Header from "../../components/UserComponents/Layouts/Header";
import Banner from "../../components/UserComponents/Home/Banner";
import { Footer } from "../../components/UserComponents/Layouts/Footer";
import { FaComment } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Constans/Loader/Loader";
import Navbar from "../../components/UserComponents/Layouts/Header";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChat = () => {
    navigate("/chat");
  };

  return (
    <div>
      <Navbar />

      {loading && <Loader />}

      <section>
        <div className="container mx-auto ">
          <div className="home-container  sm:flex-auto ">
            <a href="" className="">
              START TO SUCCESS
            </a>
            <div className="sm:flex flex-col lg:flex-row items-center">
              <div className="content p-2  lg:w-1/2   mr-4 ">
                <h1 className="text-4xl lg:text-7xl">
                  Access To <span className="text-[#7d0fc6]">5000+</span>
                  <br />
                  Courses From <span className="text-[#7d0fc6]">300</span>
                  <br />
                  Instructors & <br /> Institutions
                </h1>
                <a href="">
                  various versions have evolved over the year, sometimes by
                  accident
                </a>

                <div className="flex  sm:flex sm:justify-start gap-8 mt-8 ">
                  <button
                    onClick={() => navigate("/course")}
                    className="bg-[#7d0fc6] text-white rounded-md text-lg sm:text-xl px-4 py-2"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => navigate("/enrollments")}
                    className="bg-[#7d0fc6] text-white rounded-md text-xl px-4 py-2"
                  >
                    Watch Now!!
                  </button>
                </div>
              </div>

              <div className=" home-img-wrapper lg:w-1/2">
                <div className="flex justify-center mb-4  sm:relative w-full h-full lg:w-400 lg:h-400 sm:border-4 border-[rgb(219,219,248)] rounded-full overflow-hidden">
                  <img
                    className="w-[70%] h-[70%] sm:w-full sm:h-full rounded-full"
                    src={meta}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleChat} className=" w-full h-full flex justify-end  ">
          <h1 className="fixed bg-[#7d0fc6] w-10 rounded-full text-white p-2 mr-10 lg:bottom-3">
            <FaComment className="w-6 h-5 " />
          </h1>
        </div>
      </section>
      <Banner />

      <Footer />
    </div>
  );
}

export default Home;
