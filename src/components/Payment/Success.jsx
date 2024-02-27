import React, { useEffect } from "react";
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
    <div className="w-screen h-screen bg-[#0755B7] shadow-lg p-4">
      <video
        src="/src/assets/video/PaymentSuccessfullMain.mp4"
        className="max-w-full"
        autoPlay
        muted
      ></video>
    </div>
  );
}

export default Success;
