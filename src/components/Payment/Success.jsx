import React, { useEffect } from "react";
import success from "../../assets/video/Payment Successfull Main.mp4";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/enrollments");
    }, 6000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-white shadow-lg p-4">
      <div className="w-[100%] h-[100%] bg-white shadow-lg flex justify-center items-center">
        <video className="justify-center items-center" src={success}></video>
      </div>
    </div>
  );
}

export default Success;
