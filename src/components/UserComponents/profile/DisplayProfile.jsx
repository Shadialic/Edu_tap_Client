import React, { useEffect, useState } from "react";
import profile from "../../../../public/images/user/profile.png";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import add from "../../../../public/images/user/add.png";
import edit from "../../../../public/images/user/edit.png";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateProfile, UpdateUser, getUserData } from "../../../api/UserApi";
import { setUserDetails } from "../../../Redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

function DisplayProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  // const [image, setImage] = useState();
  const [isOpn, setOpn] = useState("profile");
  const [data, setData] = useState([]);

  // Edit Profile
  const [name, setName] = useState(userInfo.userName);
  const [phone, setphone] = useState(userInfo.phone);
  const [country, setCountry] = useState(userInfo.country);

  //Add Education
  const [Qualification, setQualification] = useState("");
  const [Year, setYear] = useState("");
  const [Institute, setInstitute] = useState("");

  useEffect(() => {
    const fetch = async () => {
      await getUserData().then((res) => {
        const userData = res.data.userData;
        const data = userData.find((item) => item.email == userInfo.email);
        setData(data);
      });
    };
    fetch();
  }, [userInfo]);

  useEffect(() => {
    if (isOpn === "editeducation") {
      setQualification(data.Qualification);
      setYear(data.year);
      setInstitute(data.Institute);
    }
  }, [isOpn, data]);

  const editProfile = () => {
    setOpn("edituser");
  };
  const showEducation = () => {
    setOpn("education");
  };
  const editEducation = () => {
    setOpn("editeducation");
  };

  const handleImageChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("email", userInfo.email);
        const response = await UpdateProfile(formData);
        const updatedImage = response.data.userData.image;
        dispatch(
          setUserDetails({
            userName: response.data.userData.userName,
            phone: response.data.userData.phone,
            country: response.data.userData.country,
            is_Active: response.data.userData.is_Active,
            email: response.data.userData.email,
            is_Admin: response.data.userData.is_Admin,
            id: response.data.userData._id,
            image: response.data.userData.image,
          })
        );
        setImage(updatedImage);
        toast(response.data.alert);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const email = userInfo.email;
      const response = await UpdateUser({
        email,
        userName: name,
        phone: phone,
        Country: country,
        Qualification: Qualification,
        Institute: Institute,
        year: Year,
      });

      toast(response.data.alert);
      dispatch(
        setUserDetails({
          userName: response.data.updatedData.userName,
          phone: response.data.updatedData.phone,
          country: response.data.updatedData.country,
          is_Active: response.data.updatedData.is_Active,
          email: response.data.updatedData.email,
          is_Admin: response.data.updatedData.is_Admin,
          id: response.data.updatedData._id,
        })
      );
      setOpn("profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isOpn === "profile" ? (
        <div className="flex w-screen h-screen  justify-center items-center shadow-sm ">
          <div className="w-[80%] sm:flex flex-row lg:w-[75%] h-[90%] bg-white shadow-sm rounded-lg  shadow-violet-600">
            <div className="w-[90%] sm:w-[30%] h-[90%] bg-white shadow-sm shadow-violet-600 mt-4 ml-5 ">
              <div>
                <div className="flex justify-center items-center ">
                  {data && data.image ? (
                    <img
                      className="w-32 h-32 mt-10 overflow-hidden rounded-full"
                      src={data.image}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="w-32 h-32 mt-10 overflow-hidden rounded-full"
                      src={profile}
                      alt="Profile"
                    />
                  )}
                </div>
              </div>
              <h1 className="font-prompt-semibold font-prompt uppercase text-center mt-3">
                {name}
              </h1>
              <div className="flex flex-col w-[75%] h-[10%] bg-violet-600 text-white font-prompt rounded-md justify-center items-center ml-9 mt-5">
                <label htmlFor="profileImageInput" className="cursor-pointer">
                  Update image
                </label>
                <input
                  type="file"
                  id="profileImageInput"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="flex  justify-center items-center w-[75%] h-[10%] bg-violet-600 mt-4 ml-9 text-white font-prompt rounded-md ">
                <button
                  onClick={() => navigate("/enrollments")}
                  className="justify-center items-center"
                >
                  Your Enrollements
                </button>
              </div>
            </div>

            <div className="w-full  mt-16 mr-10  sm:w-[62%] h-[90%] bg-white shadow-sm shadow-violet-600  justify-end items-end lg:ml-8 lg:mt-4">
              <div className="flex flex-row justify-between">
                <h1 className="font-prompt text-xl p-6">Your Details</h1>
                <div onClick={editProfile} className=" ">
                  <img className="w-6 h-5 mr-6 mt-8 " src={edit} alt="" />
                </div>
              </div>

              <div className="pl-9 font-prompt flex-row flex gap-2 ">
                <label htmlFor="">Full Name :</label>
                <h1 className="gap-3">{data.userName}</h1>
              </div>
              <div className="pl-9 font-prompt flex-row flex gap-2 mt-2">
                <label htmlFor="">Email :</label>
                <h1 className="gap-3">{data.email}</h1>
              </div>
              <div className="pl-9 font-prompt flex-row flex gap-2 mt-2">
                <label htmlFor="">Phone :</label>
                <h1 className="gap-3">{data.phone}</h1>
              </div>
              <div className="pl-9 font-prompt flex-row flex gap-2 mt-2">
                <label htmlFor="">Country :</label>
                <h1 className="gap-3">{data.Country}</h1>
              </div>
              <div className="flex flex-row justify-between">
                <h1 className="font-prompt text-xl p-6">
                  About Your Education
                </h1>
                <div className="flex flex-col ">
                  <img
                    onClick={showEducation}
                    className="w-6 h-5 mr-6 mt-8 "
                    src={add}
                    alt=""
                  />
                  <img
                    onClick={editEducation}
                    className="w-6 h-5 mr-6 mt-1  "
                    src={edit}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="pl-9 font-prompt flex-row flex gap-2 mb-1">
                  <label htmlFor="">Qualification :</label>
                  <h1 className="gap-3">{data.Qualification}</h1>
                </div>
                <div className="pl-7 font-prompt flex-row flex gap-2 mb-1 ml-36">
                  <label htmlFor="">Year :</label>
                  <h1 className="gap-2">{data.year}</h1>
                </div>
              </div>
              <div className="pl-9 font-prompt flex-row flex gap-2 mt-1">
                <label htmlFor="">Institute :</label>
                <h1 className="gap-2">{data.Institute}</h1>
              </div>
              <div>
                {data && data.Achivements && data.Achivements.length > 0 && (
                  <div>
                    <h1 className="font-prompt text-xl p-6">
                      Your Achievements
                    </h1>
                    {data.Achivements.map((item) => (
                      <div className="flex flex-row pl-6" key={item.courseName}>
                        <Avatar src={item.courseImage} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : isOpn === "edituser" ? (
        <Dialog
          open={isOpn === "edituser"}
          handler={() => setOpn("profile")}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 1, y: -100 },
          }}
        >
          <DialogHeader className="font-prompt text-black">
            Edit Profile
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <input
              value={name}
              type="text"
              placeholder="Full Name"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              onChange={(e) => setphone(e.target.value)}
              value={phone}
              placeholder="Phone"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
            />

            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder="Country"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
            />
          </div>

          <DialogFooter>
            <Button
              variant="text"
              className="bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]"
              onClick={() => setOpn("profile")}
            >
              <span>Cancel</span>
            </Button>
            <Button
              onClick={updateUser}
              variant="filled"
              className="bg-[#051339] font-prompt-normal"
              disabled={!name || !phone}
            >
              <span>Update</span>
            </Button>
          </DialogFooter>
        </Dialog>
      ) : isOpn === "education" ? (
        <Dialog
          open={isOpn === "education"}
          handler={() => setOpn("profile")}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 1, y: -100 },
          }}
        >
          <DialogHeader className="font-prompt text-black">
            Add Education
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <input
              value={Qualification}
              type="text"
              placeholder="Qualification"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
              onChange={(e) => setQualification(e.target.value)}
            />

            <input
              type="text"
              onChange={(e) => setYear(e.target.value)}
              value={Year}
              placeholder="year"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
            />

            <input
              type="text"
              onChange={(e) => setInstitute(e.target.value)}
              value={Institute}
              placeholder="Institute"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
            />
          </div>

          <DialogFooter>
            <Button
              variant="text"
              className="bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]"
              onClick={() => setOpn("profile")}
            >
              <span>Cancel</span>
            </Button>
            <Button
              onClick={updateUser}
              variant="filled"
              className="bg-violet-600 text-white font-prompt-normal"
              disabled={!name || !phone}
            >
              <span>Update</span>
            </Button>
          </DialogFooter>
        </Dialog>
      ) : isOpn === "editeducation" ? (
        <Dialog
          open={isOpn === "editeducation"}
          handler={() => setOpn("profile")}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 1, y: -100 },
          }}
        >
          <DialogHeader className="font-prompt text-black">
            Edit Education
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <input
              value={Qualification}
              type="text"
              placeholder="Qualification"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
              onChange={(e) => setQualification(e.target.value)}
            />

            <input
              type="text"
              onChange={(e) => setYear(e.target.value)}
              value={Year}
              placeholder="year"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
            />

            <input
              type="text"
              onChange={(e) => setInstitute(e.target.value)}
              value={Institute}
              placeholder="Institute"
              className="border-2 w-[90%] ml-[4%] h-12 rounded-sm border-[#434242] font-prompt text-black"
              style={{ paddingLeft: "20px" }}
            />
          </div>

          <DialogFooter>
            <Button
              variant="text"
              className="bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]"
              onClick={() => setOpn("profile")}
            >
              <span>Cancel</span>
            </Button>
            <Button
              onClick={updateUser}
              variant="filled"
              className="bg-violet-600 text-white font-prompt-normal"
              disabled={!name || !phone}
            >
              <span>Update</span>
            </Button>
          </DialogFooter>
        </Dialog>
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default DisplayProfile;
