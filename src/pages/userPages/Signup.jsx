import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import meta from "../../assets/images/web.gif";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import {
  UserSendingOtp,
  userRegisterGoogle,
  userSignUp,
} from "../../api/UserApi";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import { FcGoogle } from "react-icons/fc";
import { setUserDetails } from "../../Redux/UserSlice/UserSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const GoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: () => toast.error("Goole login failed"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );
          const result = await userRegisterGoogle(response.data);
          toast(result.data.alert);
          if (result.data.created) {
            toast(result.data.alert);
            dispatch(
              setUserDetails({
                userName: result.data.userName,
                email: result.data.email,
                role: "user",
              })
            );
            localStorage.setItem("token", result.data.jwtToken);
            navigate("/");
          } else {
            toast.error(result.data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user, dispatch, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    credential: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        formData.name.trim() === "" ||
        formData.phone.trim() === "" ||
        formData.credential.trim() === "" ||
        formData.password.trim() === ""
      ) {
        toast.error("Please fill in all required fields");
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.credential)) {
        toast.error("Please enter a valid email address");
        return;
      } else if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      } else if (!/[a-z]/.test(formData.password)) {
        toast.error("Password must contain at least one lowercase letter");
        return;
      } else if (!/[A-Z]/.test(formData.password)) {
        toast.error("Password must contain at least one uppercase letter");
        return;
      } else if (!/\d/.test(formData.password)) {
        toast.error("Password must contain at least one number");
        return;
      } else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
        toast.error("Password must contain at least one special character");
        return;
      } else if (
        !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)
      ) {
        toast.error("Please enter a valid phone number");
        return;
      } else {
        setLoading(true);
        toast.success("Form submitted successfully!");
        const userData = await userSignUp(formData);
        toast(userData.data.alert);
        if (userData.status === 201) {
          const dataOtp = { email: formData.credential };
          const tutorOtp = await UserSendingOtp(dataOtp);
          dispatch(
            setUserDetails({
              id: userData.data.saveUserData
                ? userData.data.saveUserData._id
                : null,
              userName: userData.data.saveUserData.userName,
              phone: userData.data.saveUserData.phone,
              is_Active: userData.data.saveUserData.is_Active,
              email: userData.data.saveUserData.email,
              is_Admin: userData.data.saveUserData.is_Admin,
            })
          );
          if (tutorOtp.status === 200) {
            navigate("/otp", { state: { type: "user" } });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [activeTab, setActiveTab] = useState("student");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "student") {
      navigate("/signup");
    } else if (tab === "vendor") {
      navigate("/vendor/signup");
    }
  };

  return (
    <>
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-screen h-screen py-7 px-5">
        <div className="bg-white w-full sm:max-w-[80%] min-h-[100%] overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5 flex-row">
          <div className="sm:w-1/2 w-full h-full flex flex-col justify-center items-center">
            <div className="flex items-center justify-center gap-12 mb-1.5">
              <div
                className={`text-primary font-semibold text-[13px] cursor-pointer border-b border-primary px-3 py-0.5 ${
                  activeTab === "student" ? "active-tab" : ""
                }`}
                onClick={() => handleTabClick("student")}
              >
                STUDENT
              </div>
              <div
                className={`text-gray-400 text-[13px] font-semibold cursor-pointer ${
                  activeTab === "vendor" ? "active-tab" : ""
                }`}
                onClick={() => handleTabClick("vendor")}
              >
                Tutor
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center gap-3 px-5 py-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="name"
                        className="text-[14px] text-shadow-black"
                      >
                        Username
                      </label>
                      <div className="relative flex flex-col justify-center items-center">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                          placeholder=" Enter an Name "
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="credential"
                        className="text-[14px] text-shadow-black"
                      >
                        Email
                      </label>
                      <div className="relative flex flex-col justify-center items-center">
                        <input
                          type="text"
                          name="credential"
                          id="credential"
                          className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                          placeholder=" Enter an Email "
                          value={formData.credential}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="phone"
                        className="text-[14px] text-shadow-black"
                      >
                        Phone
                      </label>
                      <div className="relative flex flex-col justify-center items-center">
                        <input
                          type="Number"
                          name="phone"
                          id="phone"
                          className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                          placeholder=" Enter an Number "
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col ">
                      <label
                        htmlFor="password"
                        className="text-[14px] text-shadow-black"
                      >
                        Password
                      </label>
                      <div>
                        <div className="relative flex items-center">
                          <input
                            type={!clicked ? "password" : "text"}
                            placeholder=" Enter a Password"
                            className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 16 16"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                              className="cursor-pointer"
                            >
                              {clicked ? (
                                <FaEyeSlash onClick={() => setClicked(false)} />
                              ) : (
                                <FaRegEye onClick={() => setClicked(true)} />
                              )}
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      className="bg-violet-600 h-8 rounded-md w-full flex justify-center items-center gap-2 text-white"
                      type="submit"
                    >
                      SignUp
                    </button>
                    {loading && (
                      <PropagateLoader className="mt-3" color="#8b44ef" />
                    )}
                  </div>
                </div>
              </form>
              <ToastContainer />

              <div className="text-[13px] text-gray-400 flex justify-center items-center gap-2 mt-3">
                <div className="border w-10"></div>
                <div>Or Login with</div>
                <div className="border w-10"></div>
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-4">
                <div
                  onClick={() => GoogleLogin()}
                  className="flex justify-center border items-center gap-5 rounded-md p-1 w-10/12 shadow-md transition duration-500 hover:scale-105 cursor-pointer"
                >
                  {/* Google Sign-In Button */}
                  <FcGoogle />
                  <div style={{ height: "32px", paddingRight: "3px" }}>
                    {/* Add your Google Sign-In button here */}
                    sign in with Google
                  </div>
                </div>
              </div>
            </div>

            <div className="text-primary text-[13px]">
              <div>
                <a href="/login">
                  Already have an account?
                  <span className="text-violet-600 text-lg ">Sign in</span>
                </a>
              </div>
            </div>
          </div>
          <div className="justify-center items-center text-center hidden lg:flex flex-col lg:w-1/2 relative">
            <div className="font-semibold text-lg w-full">
              <span className="font-bold text-4xl font-prompt-semibold">
                Edu-tap
              </span>
              {/* <h4 className="text-3xl ml-16">E-Learning Platform</h4> */}
              <img className="w-full rounded-md" src={meta} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
