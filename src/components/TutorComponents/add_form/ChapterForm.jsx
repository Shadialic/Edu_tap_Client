import React, { useState } from "react";
import form_img from "../../../../public/images/tutor/Add files-bro.png";
import upload from "../../../../public/images/tutor/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addChapter } from "../../../api/VendorApi";

function ChapterForm({ setOpn, courseId }) {
  console.log(courseId, "kaka");
  const [video, setVideo] = useState();
  const [formData, setFormData] = useState({
    chapterTitle: "",
    chapterDescription: "",
    demoVideo: null,
    chapterVideo: null,
  });
  const uploadVideo = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Edu-tap");
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dveis0axa/video/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error(
          `Failed to upload video. Status: ${cloudinaryResponse.status}`
        );
      }
      const cloudinaryData = await cloudinaryResponse.json();
      if (cloudinaryData.error) {
        console.log(cloudinaryData.error);
        return;
      }
      const uploadedVideoUrl = cloudinaryData.secure_url;
      return uploadedVideoUrl;
    } catch (error) {
      console.log("Error during video upload:", error);
    }
  };

  const handleVideoChange = async (event, type) => {
    const file = event.target.files[0];
    const url = await uploadVideo(file);
    setVideo(url);
    console.log(url, "url");
    setFormData({ ...formData, [`${type}Video`]: url });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.chapterTitle ||
      !formData.chapterDescription ||
      !formData.chapterVideo ||
      !courseId
    ) {
      toast("Please fill in all fields");
      return;
    } else {
      try {
        const response = await addChapter(formData, courseId);
        console.log(response, "lllllllllllllll");
        setOpn(false);
      } catch (error) {
        console.error("Error adding chapter:", error);
        toast("Error adding chapter. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="bg-authentication-background bg-cover flex justify-center items-center w-screen h-fit py-7 px-5">
        <div className="bg-white w-full sm:max-w-[90%] min-h-[100%] rounded-md flex border-2 border-gray-100 shadow-xl p-3 gap-5 flex-row">
          <img className="w-[50%] h-[80%] p-7" src={form_img} alt="" />
          <div className="flex">
            <form onSubmit={handleSubmit} action="">
              <div className="font-promt p-8 ">
                <label
                  htmlFor="chapterTitle"
                  className="text-[14px] text-shadow-black"
                >
                  Chapter Title
                </label>
                <div className="flex flex-col justify-center items-center">
                  <input
                    id="chapterTitle"
                    name="chapterTitle"
                    value={formData.chapterTitle}
                    onChange={handleInputChange}
                    className="border-2 border-gray-100 w-[250px] sm:w-[480px] h-[40px] outline-none rounded-md shadow-md p-2"
                    type="text"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="font-promt col-span-full">
                <label
                  htmlFor="chapterDescription"
                  className="text-[14px] text-shadow-black pl-8"
                >
                  Chapter Description
                </label>
                <div className="flex flex-col justify-center items-center">
                  <textarea
                    id="chapterDescription"
                    name="chapterDescription"
                    value={formData.chapterDescription}
                    onChange={handleInputChange}
                    className="border-2 border-gray-100 w-[250px] sm:w-[480px] h-[40px] outline-none rounded-md shadow-md p-2 focus:ring-1 "
                    type="text"
                    placeholder="Chapter description (Max-150)"
                  />
                </div>
              </div>
              <div className="font-promt p-8 col-span-full">
                <label htmlFor="" className="text-[14px] text-shadow-black">
                  Demo Video
                </label>
                <div
                  className="flex flex-col justify-center items-center border-2 border-gray-100 w-[480px] h-[65px] outline-none rounded-md shadow-md p-2"
                  onClick={() => {
                    document.getElementById("demoFileInput").click();
                  }}
                >
                  <div className="p-1 flex justify-start items-start">
                    <img className="w-10 h-6" src={upload} alt="Upload" />
                  </div>
                  <span className="flex text-[12px] justify-center items-center">
                    MP4, AVI, MOV, MKV or WEBM
                  </span>
                  <input
                    id="demoFileInput"
                    className="hidden w-[250px] sm:w-[480px] h-[40px] outline-none rounded-md shadow-md p-2"
                    type="file"
                    name="file"
                    placeholder=""
                    onChange={(event) => handleVideoChange(event, "demo")}
                  />
                </div>
              </div>
              <div className="font-promt p-8 col-span-full">
                <label htmlFor="" className="text-[14px] text-shadow-black">
                  Chapter Video
                </label>
                <div
                  className="flex flex-col justify-center items-center border-2 border-gray-100 w-[480px] h-[65px] outline-none rounded-md shadow-md p-2"
                  onClick={() => {
                    document.getElementById("chapterFileInput").click();
                  }}
                >
                  <div className="p-1 flex justify-start items-start">
                    <img className="w-10 h-6" src={upload} alt="Upload" />
                  </div>
                  <span className="flex text-[12px] justify-center items-center">
                    MP4, AVI, MOV, MKV or WEBM
                  </span>
                  <input
                    id="chapterFileInput"
                    className="hidden w-[250px] sm:w-[480px] h-[40px] outline-none rounded-md shadow-md p-2"
                    type="file"
                    name="file"
                    placeholder=""
                    onChange={(event) => handleVideoChange(event, "chapter")}
                  />
                </div>
              </div>
              <div className="flex w-[88%] rounded-md h-[40px] bg-[#ab1ad7ef] items-center justify-center mx-auto mb-8">
                <button type="submit" className="font-prompt text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ChapterForm;
