import React, { useEffect, useState } from "react";
import { UpdateProfile, profiletutor } from "../../../api/VendorApi";
import TutorDeatails from "./TutorDeatails";
import profile from "../../../../public/images/user/profile.png";
import { useSelector } from "react-redux";
import bg from "../../../../public/images/tutor/bg-home.jpg";

function DisProfile({}) {
  const [formData, setFormData] = useState();
  const [currentProfile, setCurrentProfile] = useState(profile);
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
  useEffect(() => {
    profiletutor({ email: tutorInfo.email }).then((res) => {
      const tutor = res.data.tutorData;
      setFormData(tutor);
    });
  }, []);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("email", tutorInfo.email);
      const uploadImage = UpdateProfile(formData).then((res) => {
        const image = res.data.tutorData.image;
        setCurrentProfile(image);
      });
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentProfile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const editProfile = async () => {};
  return (
    <>
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-[100%] h-screen py-7 px-5">
        <div className="absolute w-full h-full">
          <img src={bg} className="w-full h-full" alt="" />
        </div>
        <div className="flex w-[30%] h-full">
          <div className="z-40 w-full h-auto sm:max-w-[80%] min-h-[100%] bg-white shadow-md shadow-violet-700 justify-start items-start">
            <div className="w-full h-[20%] bg-violet-600">
              {formData ? (
                formData.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-center items-center rounded-full"
                  >
                    <img
                      className="w-40 h-40 mt-10 overflow-hidden rounded-full"
                      src={item.image}
                      alt="Profile"
                    />
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <img
                    className="w-40 h-40 mt-10 overflow-hidden rounded-full"
                    src={profile}
                    alt="Profile"
                  />
                </div>
              )}

              <div className="flex justify-center items-center mt-4">
                <form
                  encType="multipart/form-data"
                  className="w-[50%] h-8 border-2  text-center bg-green-600 rounded-lg font-prompt "
                >
                  <label
                    htmlFor="profileImageInput"
                    className="justify-center items-center"
                  >
                    Update Profile
                  </label>
                  <input
                    type="file"
                    id="profileImageInput"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </form>
              </div>

              <div className="mt-10 border-spacing-1 ml-3 w-[90%] flex rounded-r-2xl  bg-violet-600 text-white font-prompt text-start justify-center items-center h-14 hover:translate-x-1">
                <button>Your Account</button>
              </div>
              <div className="flex w-[90%] ml-3 mt-2 h-14 bg-violet-600 rounded-r-2xl  text-white font-prompt text-start justify-center items-center hover:translate-x-1">
                <button>Your Collections</button>
              </div>
              <div className="flex w-[90%] ml-3 h-14 mt-2 bg-violet-600 rounded-r-2xl  text-white font-prompt text-start justify-center items-center hover:translate-x-1">
                <button>Privacy Policy</button>
              </div>
              <div className="mt-2 border-spacing-1 ml-3 w-[90%] flex rounded-r-2xl  bg-violet-600 text-white font-prompt text-start justify-center items-center h-14  hover:translate-x-1">
                <button>Reset Password</button>
              </div>
            </div>
          </div>
        </div>
        <div className="z-20 flex w-[70%] h-[90%] ">
          <div className="flex-col w-full h-full bg-white-400 shadow-lg mr-36 justify-start items-start">
            <TutorDeatails formData={formData} setFormData={setFormData} />
            {/* <div className="flex items-center "> */}
            <div className="flex absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[8%] h-[8%] bg-blue-700 text-white  mt-10 ml-28 rounded-lg">
              <button
                onClick={() => editProfile()}
                className="text-center justify-center items-center font-prompt ml-9 "
              >
                Edit
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default DisProfile;
