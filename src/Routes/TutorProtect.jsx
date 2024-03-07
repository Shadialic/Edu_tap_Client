import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { chekingTutor } from "../api/VendorApi";
import { useSelector } from "react-redux";

function TutorProtect(props) {
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
  const tutorId = tutorInfo.id;
  useEffect(() => {
    const checking = async () => {
      const response = await chekingTutor(tutorId);
      if (response.status == true) {
        localStorage.removeItem("tutortoken");
      }
    };
    checking();
  },[]);
  if (localStorage.getItem("tutortoken")) {
    return props.children;
  } else {
    return <Navigate to="/vendor/login" />;
  }
}

export default TutorProtect;
