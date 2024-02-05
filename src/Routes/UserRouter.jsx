import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/userPages/Login";
import Home from "../pages/userPages/Home";
import Signup from "../pages/userPages/Signup";
import Otp from "../components/otp/Otp";

import UserPublic from "./UserPublic";
import UserLayout from "../pages/userPages/Layout";
import Profile from "../pages/userPages/Profile";
import Course from "../pages/userPages/Course";
import Enrollments from "../pages/userPages/Enrollments";

function UserRouter() {
  return (
    <Routes>
      <Route>
        <Route path="/" exact element={<Home />} />
      </Route>
      <Route
        path="/login"
        element={
          <UserPublic>
            <Login />
          </UserPublic>
        }
      />
      <Route path="/otp" exact element={<Otp />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/course" element={<Course />} />
      <Route path="/enrollments" element={<Enrollments />} />



    </Routes>
  );
}

export default UserRouter;
  