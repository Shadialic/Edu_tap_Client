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
    <div className="w-[80%] h-[80%] bg-white shadow-lg">
      <div className="w-[80%] h-[80%] bg-white shadow-lg flex justify-center items-center">
        <video className="justify-center items-center" src={success} ></video>
      </div>
    </div>
  );
}

export default Success;
