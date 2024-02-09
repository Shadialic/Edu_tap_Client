import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/UserPages/Login";
import Home from "../pages/UserPages/Home";
import Signup from "../pages/UserPages/Signup";
import Otp from "../components/otp/Otp";

import UserPublic from "./UserPublic";
import UserLayout from "../pages/UserPages/Layout";
import Profile from "../pages/UserPages/Profile";
import Course from "../pages/UserPages/Course";
import Enrollments from "../pages/UserPages/Enrollments";
import About from "../pages/UserPages/About";
import Blog from "../pages/UserPages/Blog";

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
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />


    </Routes>
  );
}

export default UserRouter;
