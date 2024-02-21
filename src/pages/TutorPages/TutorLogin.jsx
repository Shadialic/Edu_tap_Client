import React, { useEffect, useState } from "react";
import meta from "../../assets/images/web.gif";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { setTutorDetailes } from "../../Redux/TutorSlice/tutorSlice";
import PropagateLoader from "react-spinners/PropagateLoader";
import { tutorLogin, tutorRegisterGoogle } from "../../api/VendorApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TutorLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tutor, setTutor] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const GoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setTutor(codeResponse),
    onError: () => toast.error("Goole login failed"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tutor) {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tutor.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${tutor.access_token}`,
                Accept: "application/json",
              },
            }
          );
          const result = await tutorRegisterGoogle(response.data);
          toast(result.data.alert);
          if (result.data.created) {
            toast(result.data.alert);
            dispatch(
              setTutorDetailes({
                id: result.data.tutorData._id,
                tutorName: result.data.tutorName,
                email: result.data.email,
                phone: result.data.phone,
                image: result.data.image,
              })
            );
            localStorage.setItem("tutortoken", result.data.jwtToken);
            navigate("/vendor");
          } else {
            toast.error(result.data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [tutor, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.email === "") {
        toast("Please add email");
      } else if (formData.password === "") {
        toast("Please add password");
      } else {
        const loginResponse = await tutorLogin({
          email: formData.email,
          password: formData.password,
        });
        if (loginResponse.data && loginResponse.data.status) {
          localStorage.setItem("tutortoken", loginResponse.data.token);
          dispatch(
            setTutorDetailes({
              id: loginResponse.data.tutorData._id,
              name: loginResponse.data.tutorData.tutorName,
              phone: loginResponse.data.tutorData.phone,
              email: loginResponse.data.tutorData.email,
              image: loginResponse.data.tutorData.image,
              role: "tutor",
            })
          );
          navigate("/vendor/");
        } else {
          toast(loginResponse.data.alert);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-authentication-background bg-cover bg-gray-100 flex justify-center items-center w-screen h-screen py-7 px-5">
        <div className="bg-white w-full sm:max-w-[80%] min-h-[100%] overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5 flex-row">
          <div className="justify-center items-center text-center hidden lg:flex flex-col lg:w-1/2 relative">
            <div className="font-semibold text-lg w-full">
              <span className="font-prompt-semibold text-4xl mt-20">
                Edu-tap
              </span>
              {/* <h4 className='text-3xl ml-16'>E-Learning Platform</h4> */}
              <img className="rounded-md" src={meta} alt="" />
            </div>
          </div>

          <div className="sm:w-1/2 w-full h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-serif">Signin</h3>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center gap-3 px-5 py-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="email"
                        className="text-[14px] text-shadow-black"
                      >
                        Email
                      </label>
                      <div className="relative flex flex-col justify-center items-center">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                          placeholder=" Enter an Email "
                          value={formData.email}
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
                      <div className="relative flex items-center">
                        <input
                          type={clicked ? "password" : "text"}
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

                  <div className="flex w-full h-fit justify-end items-center text-primary text-[13px] ">
                    <span className="w-fit h-fit cursor-pointer">
                      Forgot password?
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        setLoading(!loading);
                      }}
                      className="bg-violet-600 h-8 rounded-md w-full flex justify-center items-center gap-2 text-white"
                      type="submit"
                    >
                      Log in
                    </button>
                    {loading && (
                      <PropagateLoader className="mt-3" color="#8b44ef" />
                    )}
                  </div>
                </div>
              </form>
              <ToastContainer />

              <div className="text-[13px] text-gray-400 flex justify-center items-center gap-2">
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
                  <div className='style="height: 32px; pr-3'>
                    {/* Add your Google Sign-In button here */}
                    sign in with Google
                  </div>
                </div>
              </div>
            </div>

            <div className="text-primary text-[13px]">
              <div>
                <a href="/vendor/signup">
                  Don't have an account?
                  <span className="text-violet-600 text-lg ">Sign up</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorLogin;
