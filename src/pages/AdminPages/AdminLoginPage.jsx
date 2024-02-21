import React, { useState } from "react";
import meta from "../../assets/images/tutor.gif";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminSignIn } from "../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VendorLogin() {
  const navigate=useNavigate()
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    credential: "",
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
    setLoading(true);
    try {
      if (formData.credential === "") {
        toast("Please add email");
      } else if (formData.password === "") {
        toast("Please add password");
      } else {
        const loginResponse = await AdminSignIn({
          credential: formData.credential,
          password: formData.password,
        });
        if (loginResponse.loginData) {
          // toast(loginResponse.data.alert)
          localStorage.setItem("admintoken", loginResponse.admintoken);
          navigate("/admin/dashboard");
        } else {
          toast(loginResponse.alert);
        }
      }
    } catch (err) {
      console.log(err);
    }finally{
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
            <h3 className="text-2xl font-serif">Admin</h3>

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
                          name="credential"
                          id="credential"
                          className="border p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
                          placeholder=" Enter an Email "
                          value={formData.credential}
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
                      className="bg-lightBlue-950 h-8 rounded-md w-full flex justify-center items-center gap-2 text-white"
                      type="submit"
                    >
                      Log in
                    </button>
                    {loading && (
                      <PropagateLoader className="mt-3" color="#082F49" />
                    )}
                  </div>
                </div>
              </form>
              <ToastContainer/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorLogin;
